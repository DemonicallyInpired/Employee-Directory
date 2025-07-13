<!DOCTYPE html>
<html>
    <head>
        <meta name = "viewport" content="width=device-width,initial-scale=1" />
        <meta charset="utf8" />
        <link rel="stylesheet" href="./assets/css/index.css" />
        <link rel="stylesheet" href="./assets/css/header.css" />
        <link rel="stylesheet" href="./assets/css/pagination.css" />
        <link rel="stylesheet" href="./assets/css/gird.css" />
        <link rel="stylesheet" href="./assets/css/footer.css" />
        <link rel="stylesheet" href="./assets/css/AddModal.css" />
        <link rel="stylesheet" href="./assets/css/FilterForm.css" />
    </head>
    <body>
        <#include "/partials/Header.ftl" />
        <main>
            <#include "/partials/Pagination.ftl" />
            <#include "/partials/Grid.ftl" />
        </main>
        <#include "/partials/Footer.ftl" />
        <#include "/partials/AddModal.ftl" />
        <#include "/partials/FilterForm.ftl" />
        <script src="./assets/js/run.js" type="module"></script>
    </body>
</html>