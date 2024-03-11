# gobarber-backend-nodejs

# You can create a new migration using CLI:

# typeorm migration:create path-to-migrations-dir/migrationName


### para a aplicação rodar devo criar um db de postgres no dbeaver consultar arquivo env para configurar ambiente 

docker run --name gostack_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

container roda na porta 5432 e pega todos os ambientes da .env

caso o projeto esta em um novo PC deve rodar a migration
yarn migration:run  -> assim recriando o banco no postgres

yarn migration:revert -> reverter a ultimas alterações do migration

yarn migration:show -> mostrar todas as migrations que foram rodada