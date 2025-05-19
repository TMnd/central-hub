#!/bin/bash

JAVA_OPTS_APPEND+=" -Dquarkus.datasource.username=${DB_USER_NAME} "
JAVA_OPTS_APPEND+="-Dquarkus.datasource.password=${DB_USER_PASSWORD} "
JAVA_OPTS_APPEND+="-Ddiscord.bot.token=${DISCORD_BOT_TOKEN} "
JAVA_OPTS_APPEND+="-Ddiscord.bot.user.id==${USER_ID} "
JAVA_OPTS_APPEND+="-Ddiscord.bot.user.id==${BASIC_TOKEN} "

/opt/jboss/container/java/run/run-java.sh