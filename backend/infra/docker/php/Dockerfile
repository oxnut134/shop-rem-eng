# 1. Apache付きのPHPイメージ（必須）
FROM php:8.3-apache-bullseye

# 2. 依存パッケージのインストール
RUN apt-get update && \
  apt-get -y install --no-install-recommends git unzip libzip-dev libicu-dev libonig-dev && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  docker-php-ext-install intl pdo_mysql zip bcmath

# 3. Apacheの設定（ドキュメントルートをpublicに変更）
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
RUN a2enmod rewrite

WORKDIR /var/www/html

# 4. Composerのコピー
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# 5. ソースコードをコピー
COPY ./src /var/www/html

# 6. 【重要】artisanを動かさない設定（これでエラーを回避）
RUN composer install --no-dev --optimize-autoloader --no-scripts

# 7. 権限設定（500エラー防止）
RUN chmod -R 777 storage bootstrap/cache
RUN chown -R www-data:www-data /var/www/html

# 8. ポートの明示
EXPOSE 80
