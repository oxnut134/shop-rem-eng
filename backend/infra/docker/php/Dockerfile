# 1. Apache付きのPHPイメージに変更
FROM php:8.3-apache-bullseye

# 依存パッケージのインストール
RUN apt-get update && \
  apt-get -y install --no-install-recommends git unzip libzip-dev libicu-dev libonig-dev && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  docker-php-ext-install intl pdo_mysql zip bcmath

# 2. Apacheのドキュメントルートの設定
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
RUN a2enmod rewrite

WORKDIR /var/www/html

# Composerのコピー
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# 4. ソースコードをコピー
COPY ./src /var/www/html

# 5. 【修正ポイント】スクリプト実行を一旦スキップしてインストール
# --no-scripts をつけることで artisan がなくてもインストールを完了させます
RUN composer install --no-dev --optimize-autoloader --no-scripts

# 【追加】ビルド時に設定キャッシュを強制削除
RUN php artisan config:clear && php artisan cache:clear

# 【修正】権限を 777 にして「権限不足」を物理的に排除
RUN chmod -R 777 storage bootstrap/cache
RUN chown -R www-data:www-data /var/www/html



EXPOSE 80
