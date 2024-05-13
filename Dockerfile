FROM node@sha256:b6e7fef05c7609784c320e5c746aaf8d49221ec0eb3c1242fb673099511b0583
USER node
WORKDIR /app

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci

COPY --chown=node:node ./src/ ./src/
COPY --chown=node:node ./tsconfig.json ./tsconfig.json
COPY --chown=node:node ./custom.d.ts ./custom.d.ts
COPY --chown=node:node ./nodemon.json ./nodemon.json
COPY --chown=node:node ./.env ./.env
RUN npm run build

EXPOSE 4000

# COPY ./entrypoint.sh ./entrypoint.sh
# ENTRYPOINT [ "./entrypoint.sh" ]

CMD [ "npm", "run", "start" ]