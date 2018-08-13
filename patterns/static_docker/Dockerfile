FROM php:fpm-alpine

RUN apk add --no-cache --update icu-libs icu icu-dev
RUN docker-php-ext-install intl pdo pdo_mysql