FROM golang:latest  as builder
ADD ./src /go/src/authorBook
WORKDIR /go/src/authorBook
RUN go get authorBook
RUN go build authorBook

FROM nginx

COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /go/src/authorBook/authorBook /

COPY ./src/init_data init_data

CMD ["/authorBook"]
