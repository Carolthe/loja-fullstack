## Rotas

            ##Usuários / Autenticação##

POST | /api/users/register – Registro de usuário

POST | /api/users/login – Login de usuário

POST | /api/users/forgot-password – Solicitar link de recuperação de senha

POST | /api/users/reset-password – Resetar senha com token


            ##Produtos##

GET | /api/produtos – Listagem de todos os produtos

GET | /api/produtos/ordenados – Listagem de produtos ordenados por preço

            ##Categorias##

GET | /api/categorias – Listagem de todas as categorias

GET | /api/categorias/:id_categoria/produtos – Listagem de produtos por categoria

            ##Carrinho##

POST | /api/carrinho – Adicionar produto ao carrinho

GET | /api/carrinho/:id_usuario – Listar produtos do carrinho de um usuário

DELETE | /api/carrinho/:id_usuario/:id_produto – Remover produto do carrinho

            ##Favoritos##

POST | /api/favoritos – Adicionar produto aos favoritos

GET | /api/favoritos/:id_usuario – Listar favoritos de um usuário

DELETE | /api/favoritos/:id_usuario/:id_produto – Remover produto dos favoritos

            ##Newsletter##

POST | /api/newsletter – Cadastrar e-mail na newsletter
Contato

POST | /api/contact – Enviar mensagem de contato

            ##Localização##

POST | /localizacao/:id_usuario – Adicionar localização do usuário

PUT | /localizacao/:id_usuario – Atualizar localização do usuário

GET | /localizacao/:id_usuario – Obter localização do 



