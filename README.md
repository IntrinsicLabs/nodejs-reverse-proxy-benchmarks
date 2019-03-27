# nodejs-reverse-proxy-benchmarks

This is a companion repository for our blog post, "Why should I use a Reverse
Proxy if Node.js is Production-Ready?"

You will probably want to download a recent stable version of
[Nginx](https://nginx.org/en/download.html) to perform these benchmarks. You'll
also want a recent stable version of [Node.js](https://nodejs.org/en/download/)
as well.

If you compile Nginx from source make sure you provide the
`--with-http_ssl_module` flag, otherwise the SSL tests will fail.

The following sections contain instruction for recreating each of the benchmark
results:

## `nginx`

```bash
nginx -c nginx.conf -p .
siege -c 10 -r 20000 -b http://localhost:8080/
```

## `nginx-ssl`

```bash
./gen-ssl.sh # only needs to be run once
nginx -c nginx-ssl.conf -p .
siege -c 10 -r 20000 -b https://localhost:8443/
```

## `node`

```bash
./node.js 8080
siege -c 10 -r 20000 -b http://localhost:8080/
```

## `node-ssl`

```bash
./gen-ssl.sh # only needs to be run once
./node-ssl.js
siege -c 10 -r 20000 -b https://localhost:8443/
```

## `nginx-node`

```bash
./node.js 8081
nginx -c nginx-node.conf -p .
siege -c 10 -r 20000 -b http://localhost:8080/
```

## `nginx-ssl-node`

```bash
./gen-ssl.sh # only needs to be run once
./node.js 8081
nginx -c nginx-ssl-node.conf -p .
siege -c 10 -r 20000 -b https://localhost:8443/
```

## `node-cluster`

```bash
./node-cluster.js
siege -c 10 -r 20000 -b http://localhost:8080/
```

## `nginx-cluster-node`

```bash
./node.js 8081
./node.js 8082
nginx -c nginx-cluster-node.conf -p .
siege -c 10 -r 20000 -b http://localhost:8080/
```

## `node-gzip`

```bash
./node-gzip.js
siege -c 10 -r 20000 -b http://localhost:8080/
```

## `nginx-gzip-node`

```bash
./node.js 8081
nginx -c nginx-gzip-node.conf -p .
siege -c 10 -r 20000 -b http://localhost:8080/
```
