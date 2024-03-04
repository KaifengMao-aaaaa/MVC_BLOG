#!/bin/bash
echo 'Get envoriment variables'
export $(grep -v '^#' .env | xargs)
echo "Script start"
pg_dump $DB_NAME > './public/dump.sql'
dropdb $DB_NAME
createdb $DB_NAME
psql -f ./src/utils/database.sql $DB_NAME
echo "Script end"