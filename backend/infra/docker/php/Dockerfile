# 1. Apache付きのPHPイメージ
FROM php:8.3-apache-bullseye

# 2. 依存パッケージのインストール（libpq-dev を追加）
RUN apt-get update && \
  apt-get -y install --no-install-recommends git unzip libzip-dev libicu-dev libonig-dev libpq-dev && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  docker-php-ext-install intl pdo_mysql pdo_pgsql zip bcmath

# 3. Apacheの設定
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
RUN a2enmod rewrite

WORKDIR /var/www/html

# 4. Composerのコピー
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# 5. ソースコピー
COPY ./src /var/www/html

# 6. artisanを動かさない設定
RUN composer install --no-dev --optimize-autoloader --no-scripts

# 7. 権限設定
RUN chmod -R 777 storage bootstrap/cache
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
