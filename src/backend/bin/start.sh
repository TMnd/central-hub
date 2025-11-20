#!/bin/bash

JAVA_OPTS_APPEND+=" -Dquarkus.datasource.username=${DB_USER_NAME} "
JAVA_OPTS_APPEND+="-Dquarkus.datasource.password=${DB_USER_PASSWORD} "

/opt/jboss/container/java/run/run-java.sh