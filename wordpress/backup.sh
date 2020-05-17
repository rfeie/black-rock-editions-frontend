
#!/bin/bash

WP_NAME="wp-headless";
DB_NAME="db-headless/mysql";
MYSQL_ENV_MYSQL_ROOT_PASSWORD="wp_headless"
docker exec db-headless sh -c 'exec mysqldump -u"wp_headless" -p"wp_headless" "wp_headless"' > $(pwd)/wp_database.sql
docker run --rm --volumes-from $WP_NAME debian tar -cz /var/www/html > wordpressBackUp.tar.gz;