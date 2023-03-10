const data = {
    stores: [
        {
            id: 1,
            images: [
                { id: 1,
                    urlImage:  require("./images/stores/quickdeli/quickdeli.jpg"),
                },
            ],
            name: "Quickdeli ― Ingeniería",
            location: "Cerca del patio de Ingeniería. Vicuña Mackenna 4860, Macul",
            schedule: "10:00 a 20:00 horas.",
            content: `Desde 2002 somos pioneros en el concepto de “Gastronomía Rápida Saludable”con 13 tiendas en Santiago.
            Nuestros alimentos son naturales y elaborados diariamente por nuestros artesanos gastronómicos y no contienen aditivos ni preservantes.
            'Eres lo que comes'
            Confiamos en el poder de una buena alimentación`,
            products: [
                {
                    id:1,
                    name: "Panino Fritto Wurstel Patatine",
                    content: "Pan frica con vienesas y papas fritas.",
                    category: "Sandwiches",
                    urlImage: require("./images/stores/quickdeli/quickdeli1.jpg"),
                },
                {
                    id:2,
                    name: "Ensalada Salmón Quinoa",
                    content: "Quinoa cocida, salmon ahumado, con tiernos trozos de tomates y pimientos rojos, sobre un mix de frescas lechugas y finos toques de alcaparra y ciboulette. Dressing en base a maracuya",
                    category: "Ensaladas",
                    urlImage: require("./images/stores/quickdeli/quickdeli2.jpg"),
                },
                {
                    id:3,
                    name: "Wrap Mechada Vegetales Asados",
                    content: "Mechada con queso crema y gauda más ciboulette",
                    category: "Wraps",
                    urlImage: require("./images/stores/quickdeli/quickdeli3.jpg"),
                },
                {
                    id:4,
                    name: "Tiramisú",
                    content: "Tiramisú con cobertura de galleta chocolate molida",
                    category: "Postres",
                    urlImage: require("./images/stores/quickdeli/quickdeli4.jpg"),
                },
                {
                    id:5,
                    name: "Tiramisú",
                    content: "Tiramisú con cobertura de galleta chocolate molida",
                    category: "Postres",
                    urlImage: require("./images/stores/quickdeli/quickdeli4.jpg"),
                },
                {
                    id:6,
                    name: "Tiramisú",
                    content: "Tiramisú con cobertura de galleta chocolate molida",
                    category: "Postres",
                    urlImage: require("./images/stores/quickdeli/quickdeli4.jpg"),
                },
                {
                    id:7,
                    name: "Tiramisú",
                    content: "Tiramisú con cobertura de galleta chocolate molida",
                    category: "Postres",
                    urlImage: require("./images/stores/quickdeli/quickdeli4.jpg"),
                },
            ],
            comments: [
                {
                    id:1,
                    userName: "Sherlock Holmes",
                    content: "Muy caro comparado con otros locales, pero quitando ese detalle es bien bueno.",
                    urlImage: require("./images/users/sherlock.jpg"),
                },
                {
                    id:2,
                    userName: "John H. Watson",
                    content: "Concuerdo con mi estimado compañero, caro pero bueno.",
                    urlImage: require("./images/users/watson.jpg"),
                },
                {
                    id:3,
                    userName: "John H. Watson",
                    content: "Por cierto hay que cenar, voy a preparar algo.",
                    urlImage: require("./images/users/watson.jpg"),
                },
                {
                    id:4,
                    userName: "Sherlock Holmes",
                    content: "Espero que este bueno porque con lo caro de los precios de esta tienda se me quita todo el hambre.",
                    urlImage: require("./images/users/sherlock.jpg"),
                },
            ],
            contact: {
                direction: `Cerro el Plomo 5855, Oficina 1205. Las Condes, Santiago`,
                phone: `+569 8765 4321`,
                mail: `contacto@quickdeli.cl`,
            },
            global_rating: 4.7,


        },
        {
            id: 2,
            images: [
                { id: 1,
                    urlImage:  require("./images/stores/quickdeli/quickdeli_biblioteca.jpg"),
                },
            ],
            name: "Quickdeli ― Biblioteca",
            location: "Cerca del patio de Ingeniería. Vicuña Mackenna 4860, Macul",
            schedule: "10:00 a 20:00 horas.",
            content: `Desde 2002 somos pioneros en el concepto de “Gastronomía Rápida Saludable”con 13 tiendas en Santiago.
            Nuestros alimentos son naturales y elaborados diariamente por nuestros artesanos gastronómicos y no contienen aditivos ni preservantes.
            'Eres lo que comes'
            Confiamos en el poder de una buena alimentación`,
            products: [
                {
                    id:1,
                    name: "Panino Fritto Wurstel Patatine",
                    content: "Pan frica con vienesas y papas fritas.",
                    category: "Sandwiches",
                    urlImage: require("./images/stores/quickdeli/quickdeli1.jpg"),
                },
                {
                    id:2,
                    name: "Ensalada Salmón Quinoa",
                    content: "Quinoa cocida, salmon ahumado, con tiernos trozos de tomates y pimientos rojos, sobre un mix de frescas lechugas y finos toques de alcaparra y ciboulette. Dressing en base a maracuya",
                    category: "Ensaladas",
                    urlImage: require("./images/stores/quickdeli/quickdeli2.jpg"),
                },
                {
                    id:3,
                    name: "Wrap Mechada Vegetales Asados",
                    content: "Mechada con queso crema y gauda más ciboulette",
                    category: "Wraps",
                    urlImage: require("./images/stores/quickdeli/quickdeli3.jpg"),
                },
                {
                    id:4,
                    name: "Tiramisú",
                    content: "Tiramisú con cobertura de galleta chocolate molida",
                    category: "Postres",
                    urlImage: require("./images/stores/quickdeli/quickdeli4.jpg"),
                },
                {
                    id:5,
                    name: "Tiramisú",
                    content: "Tiramisú con cobertura de galleta chocolate molida",
                    category: "Postres",
                    urlImage: require("./images/stores/quickdeli/quickdeli4.jpg"),
                },
                {
                    id:6,
                    name: "Tiramisú",
                    content: "Tiramisú con cobertura de galleta chocolate molida",
                    category: "Postres",
                    urlImage: require("./images/stores/quickdeli/quickdeli4.jpg"),
                },
                {
                    id:7,
                    name: "Tiramisú",
                    content: "Tiramisú con cobertura de galleta chocolate molida",
                    category: "Postres",
                    urlImage: require("./images/stores/quickdeli/quickdeli4.jpg"),
                },
            ],
            comments: [
                {
                    id:1,
                    userName: "Sherlock Holmes",
                    content: "Muy caro comparado con otros locales, pero quitando ese detalle es bien bueno.",
                    urlImage: require("./images/users/sherlock.jpg"),
                },
                {
                    id:2,
                    userName: "John H. Watson",
                    content: "Concuerdo con mi estimado compañero, caro pero bueno.",
                    urlImage: require("./images/users/watson.jpg"),
                },
                {
                    id:3,
                    userName: "John H. Watson",
                    content: "Por cierto hay que cenar, voy a preparar algo.",
                    urlImage: require("./images/users/watson.jpg"),
                },
                {
                    id:4,
                    userName: "Sherlock Holmes",
                    content: "Espero que este bueno porque con lo caro de los precios de esta tienda se me quita todo el hambre.",
                    urlImage: require("./images/users/sherlock.jpg"),
                },
            ],
            contact: {
                direction: `Cerro el Plomo 5855, Oficina 1205. Las Condes, Santiago`,
                phone: `+569 8765 4321`,
                mail: `contacto@quickdeli.cl`,
            },
            global_rating: 4.5,

        },
    ],
};

export default data;