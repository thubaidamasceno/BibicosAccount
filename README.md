# BibicosAccount
Plataforma de Gerenciamento Financeiro para Famílias

Esse projeto é meu Trabalho de Conclusão de Curso de Pós-Graduação em Engenharia de Software pela PUC-MINAS, mas não apenas isso ;)

[Link para o Wireframe no Figma](https://www.figma.com/proto/M5p28NL6FfNjyt83DliXhT/BibicosAccount?type=design&node-id=109-5435&t=JE9PgNEVK4VpROpr-0&scaling=scale-down&page-id=109%3A5435&starting-point-node-id=128%3A44212)



## Introdução

A gestão financeira pessoal é uma atividade que pode ser exercida de diversas maneiras diferentes, e independentemente da faixa de renda ou do nível de escolaridade dos indivíduos, uma pessoa com uma vida financeira saudável tem consciência razoável sobre seus saldos bancários, patrimônio, direitos a receber e obrigações a pagar. Anotações em papel, planilhas eletrônicas e aplicativos de gerenciamento financeiros estão entre as soluções conhecidas mais utilizadas. Os gerenciadores de finanças pessoais não são uma categoria nem um pouco nova de aplicativo, e no mercado existem diversas soluções, para variados perfis de usuário e em diferentes plataformas. 

Porém, a minoria dos gerenciadores financeiros consideram que, dentro de um contexto de utilização pessoal, muitas vezes mais uma pessoa está envolvida na gestão dos das finanças da casa; esse é o da gestão do orçamento de casais e famílias. Muitas vezes, casais ou famílias se veem obrigados a compartilhar dados financeiros através de planilhas, para que sejam ajustadas a divisão de contas em comum, controladas questões relacionadas ao empréstimo de cartões de crédito, ou para atingir metas de poupança. Porém, o uso de planilhas nem sempre é confortável e seguro. Muitas vezes alguns dos usuários não possuem expertise na manipulação da planilha, e de uma forma geral, uma planilha oferece poucos recursos para evitar erros de preenchimento, modificação ou exclusão acidental de dados.

Considerando que a gestão financeira pessoal não deve tornar-se uma atividade complexa, sob a pena de não ser realizada com a regularidade necessária, e que não se pode exigir um grande domínio tecnológico dos usuários comuns, percebe-se a importância de um aplicativo de gestão financeira que guie o usuário para realizar a inserção de dados de maneira simplificada, e consolide automaticamente os dados dos conjugues ou familiares, apresentando informações resumidas. Tal aplicação seria um meio-termo entre um gerenciador de finanças pessoal e um corporativo. Embora já existam soluções que se propõem a atender a demandas desse tipo, trata-se de um mercado bastante amplo, e virtualmente existem inúmeras maneiras de se criar vantagens competitivas nesse campo.

O objetivo deste trabalho é apresentar a descrição do projeto de uma Aplicação Web de gerenciamento de finanças, voltada para famílias, que será chamada BibicosAccount.

Os objetivos específicos são:

•	Descrever os requisitos da aplicação;

•	Apresentar o diagrama de classes de domínio;

•	Descrever o padrão arquitetural da solução; 

•	Descrever a estrutura do front end.

•	Apresentar o modelo relacional do banco de dados da solução; 

•	Descrever o plano de testes do da solução.

## Definição Conceitual da Solução

O gerenciador financeiro para famílias BibicosAccount, é definido como uma aplicação web hospedada em algum servidor na internet de forma que seus usuários possam acessá-la através de um navegador web convencional a partir de diferentes tipos de dispositivos (mobile, desktop, smartTV, etc).

O BibicosAccount tem por estratégia utilizar a consagrada metodologia contábil de partidas dobradas na lógica de negócio de seu Back-End; pois essa metodologia, embora aparentemente complexa, é extremamente poderosa, flexível e eficiente, o que ajudará a evitar inconsistências. Já na camada de Front-End devem ser apresentados ao usuário formulários bastante simplificados e objetivos para a inserção de dados, mas que poderão ser configurados de maneira a se adequar a transações mais complexas.

Para utilizar o BibicosAccount o usuário deve primeiramente autenticar-se, ou caso seja seu primeiro acesso, realizar cadastro. O usuário é identificado fundamentalmente por seu e-mail. Quando autenticado o usuário poderá acessar os Livros de Contábeis (Livros) aos quais já tem acesso, ou ainda criar um ou mais Livros. Para cada Livro ao qual tem acesso o usuário poderá convidar parceiros informando seus e-mails; caso o e-mail informado ainda não esteja cadastrado na plataforma, será enviada uma mensagem com convite para fazer o cadastro. Uma vez tendo o usuário acesso à determinado Livro, não existirá qualquer restrição para administrá-lo ou excluí-lo, pois não está prevista a implantação de uma política de controle de direitos de acesso e modificação de dados.

O Livro funciona como um livro contábil de ‘partidas dobradas’ também conhecido no meio contábil como Ledger. Em um Livro os usuários poderão usar Contas predefinidas ou criar Contas com nomenclatura personalizadas, mas sempre organizadas em uma estrutura que estará dividida entre Ativo, Passivo, Receitas, Despesas e Capital. As contas receberão Lançamentos vinculados à Operações Financeiras (Operações), sendo que em cada Operação deve existir no mínimo um lançamento de débito e um lançamento de crédito, em contas diferentes, e a soma de tudo o que for creditado deve equivaler a tudo o que for debitado.

A complexidade trazida pela metodologia de livro contábil será mascarada pela interface com usuário simplificada, que exigirá o preenchimento apenas das informações essenciais, e criará Operações contendo múltiplos Lançamentos, utilizando o padrão de um Modelo de Operação. Além disso, diferentes Livros contábeis poderão ser conectados entre através da criação de uma Conexão entre ele; assim, será necessário inserir os dados das transações apenas uma vez, e estes serão contabilizadas de diferentes formas em cada livro, o que facilitará a gestão simultânea das finanças individuais e familiares.
Para ilustrar o conceito de modo de utilização, foi elaborado o seguinte caso fictício:

“Ana e Beto são um casal que usa um Livro de Contas compartilhado para suas contas de casal, mas cada um tem um Livro individual, e conectado ao Livro do casal. Em seus Livros individuais eles tem contas bancárias, contas para registrar operações com cartão de crédito, carnês e parcelamento, e também contas para registrarem despesas e receitas tais como hobbies e salários. No Livro do casal está a conta corrente conjunta, financiamentos, despesas domésticas gerais e rendimentos de investimentos do casal. Nas configurações do Livro do casal foi mantida a configuração padrão de manter a divisão igualitária dos valores entre ambos, ou seja, caso haja registro da compra de um bem ou contração de uma dívida, a cada um ficará associada uma metade do valor de cada Lançamento da Operação; embora essa divisão possa ser ajustada. Como seus Livros individuais e conjuntos estão conectados, haverá reflexo das somas do Livro do casal nos Livros individuais.

Neste mês Ana pagou dois mil reais do aluguel da casa onde moram, integralmente através de sua conta corrente individual; embora essa despesa seja dividida com Beto, ele compensará posteriormente. No BibicosAccount Ana registrará essa operação em poucas etapas: começará com a criação de uma nova Operação selecionando o Modelo de Operação pré-configurado para pagamento de contas domésticas, indicará qual despesa foi paga e finalmente qual a conta corrente que foi debitada. Daí a lógica implementada na aplicação tratará de gerar os Lançamentos em seu Livro individual: um débito de dois mil reais na conta corrente de Ana, um crédito de mil reais na sua conta de ‘contas domésticas a pagar’, e um créditos de mil reais na conta de ‘devoluções a receber’; e gerará Lançamentos no Livro do casal: crédito de dois mil reais na conta de  ‘contas domésticas a pagar’, crédito de mil reais na conta de ‘valores pagos por Ana’, débito de mil reais na conta ‘devoluções a pagar a Ana’ e um crédito na conta ‘débitos pendentes de Beto’. Como o Livro individual de Beto está conectado ao Livro do casal, ao gerar um relatório do balancete patrimonial ele verá em seu passivo uma seção dedicada às contas de sua responsabilidade no Livro do casal, e lá, mil reais na conta ‘débitos pendentes de Beto’.” 
