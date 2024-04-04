M=make
PHP=php bin/console

help: ## Affiche les commandes possibles du makefile
	@egrep -h '\s##\s' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m  %-30s\033[0m %s\n", $$1, $$2}'


migration: ## Faire la migration dans le projet
	$(PHP) make:migration

migrate: ## Faire la migration dans la base
	$(PHP) doctrine:migrations:migrate

start: ## Start le server sur le localhost
	symfony serve

db: ## Créer la base de donnée
	$(PHP) doctrine:database:create

fixtures-load: ## Recharger les données des jeux de données
	$(PHP) doctrine:fixtures:load -n