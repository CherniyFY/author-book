package main

import (
	"authorBook/models"
	"authorBook/schema"
	"context"
	"log"
	"net/http"
	"strings"

	"github.com/graph-gophers/graphql-go"
	"github.com/graph-gophers/graphql-go/relay"
)

type params struct {
	Query         string                 `json:"query"`
	OperationName string                 `json:"operationName"`
	Variables     map[string]interface{} `json:"variables"`
}

type QueryHandler struct {
	Schema *graphql.Schema
}

func (h *QueryHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	var userResolver *models.UserResolver
	userResolver = nil

	authorizationData := r.Header.Get("Authorization")
	if authorizationData != "" {
		splitToken := strings.Split(authorizationData, "Token ")
		token := splitToken[1]

		for _, authToken := range models.Dm.AuthTokens {
			if authToken.Data.Token == token {
				userResolver = authToken.User()
			}
		}
	}
	queryHandler := relay.Handler{Schema: h.Schema}
	queryHandler.ServeHTTP(w, r.WithContext(context.WithValue(r.Context(), "User", userResolver)))
}

func main() {

	schema := graphql.MustParseSchema(schema.Schema, &models.Resolver{})

	http.Handle("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write(page)
	}))

	http.Handle("/api/query", &QueryHandler{schema})

	log.Print("Server started on port 8080...")

	log.Fatal(http.ListenAndServe(":8080", nil))
}

var page = []byte(`
<!DOCTYPE html>
<html>
	<head>
		<link href="https://cdnjs.cloudflare.com/ajax/libs/graphiql/0.11.11/graphiql.min.css" rel="stylesheet" />
		<script src="https://cdnjs.cloudflare.com/ajax/libs/es6-promise/4.1.1/es6-promise.auto.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.3/fetch.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.2.0/umd/react.production.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.2.0/umd/react-dom.production.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/graphiql/0.11.11/graphiql.min.js"></script>
	</head>
	<body style="width: 100%; height: 100%; margin: 0; overflow: hidden;">
		<div id="graphiql" style="height: 100vh;">Loading...</div>
		<script>
			function graphQLFetcher(graphQLParams) {
				return fetch("/api/query", {
					method: "post",
					body: JSON.stringify(graphQLParams),
					credentials: "include",
				}).then(function (response) {
					return response.text();
				}).then(function (responseBody) {
					try {
						return JSON.parse(responseBody);
					} catch (error) {
						return responseBody;
					}
				});
			}
			ReactDOM.render(
				React.createElement(GraphiQL, {fetcher: graphQLFetcher}),
				document.getElementById("graphiql")
			);
		</script>
	</body>
</html>
`)
