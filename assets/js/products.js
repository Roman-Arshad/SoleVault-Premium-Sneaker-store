// =====================================================
// PRODUCT DATA
// COLOR VARIANT SYSTEM (UPGRADED)
// =====================================================

const products = [

    {
        id: 1,
        name: "Nike Air Max 270",
        brand: "Nike",
        category: "Running",
        oldPrice: 150,
        price: 120,
        discount: "-20%",
        image: "../assets/images/products/nike/air-max-270/nike-air-max-270-white.png",
        badge: "-20%",
        rating: 4.9,
        reviews: 250,

        availability: "In Stock",
        description: "The Nike Air Max 270 delivers plush all-day comfort with its largest heel Air unit.",
        sku: "SV-NK-AM270",
        stock: 10,
        sold: 0,

        colors: [
            {
                name: "White",
                hex: "#ffffff",
                images: [
                    "../assets/images/products/nike/air-max-270/nike-air-max-270-white.png"
                ]
            },
            {
                name: "Black",
                hex: "#000000",
                images: [
                    "../assets/images/products/nike/air-max-270/nike-air-max-270-black.png",
                    "../assets/images/products/nike/air-max-270/nike-air-max-270-black-white.png"
                ]
            },
            {
                name: "Brown",
                hex: "#7a4a2d",
                images: [
                    "../assets/images/products/nike/air-max-270/nike-air-max-270-brown.png"
                ]
            }
        ],
        onFoot: [
            "../assets/images/products/nike/air-max-270/nike-air-max-270-onfoot-1.png",
            "../assets/images/products/nike/air-max-270/nike-air-max-270-onfoot-2.png"
        ],
        model3d: "../assets/models/nike-airmax-270.glb"

    },

    {
        id: 2,
        name: "Adidas Ultraboost 5",
        brand: "Adidas",
        category: "Running",
        price: 200,
        oldPrice: null,
        discount: "",
        image: "../assets/images/products/adidas/ultraboost-5/adidas-ultraboost-5-black.png",
        badge: "Popular",
        rating: 4.8,
        reviews: 186,
        availability: "In Stock",
        sku: "SV-AD-UB5",
        stock: 10,
        sold: 0,
        description:
            "The Adidas Ultraboost 5 combines responsive Boost cushioning with a lightweight Primeknit upper, making it ideal for running and everyday comfort.",
        colors: [
            {
                name: "Black",
                hex: "#000",
                images: [
                    "../assets/images/products/adidas/ultraboost-5/adidas-ultraboost-5-black.png",
                    "../assets/images/products/adidas/ultraboost-5/adidas-ultraboost-5-black-white.png",
                    "../assets/images/products/adidas/ultraboost-5/adidas-ultraboost-5-black-purple.png"
                ]
            },
            {
                name: "White",
                hex: "#fff",
                images: [
                    "../assets/images/products/adidas/ultraboost-5/adidas-ultraboost-5-white.png"
                ]
            },
            {
                name: "Grey",
                hex: "#888888",
                images: [
                    "../assets/images/products/adidas/ultraboost-5/adidas-ultraboost-5-grey.png"
                ]
            },
            {
                name: "Yellow",
                hex: "#f1c40f",
                images: [
                    "../assets/images/products/adidas/ultraboost-5/adidas-ultraboost-5-yellow.png"
                ]
            }
        ],
        onFoot: [
            "../assets/images/products/adidas/ultraboost-5/adidas-ultraboost-5-onfoot-1.png",
            "../assets/images/products/adidas/ultraboost-5/adidas-ultraboost-5-onfoot-2.png"
        ],
        model3d: "../assets/models/adidas-ultraboost.glb"
    },
    {
        id: 3,
        name: "Air Jordan 4 Retro",
        brand: "Jordan",
        category: "Basketball",
        price: 220,
        oldPrice: null,
        discount: "",
        image: "../assets/images/products/jordan/retro-4/air-jordan-4-retro-white.png",
        badge: "Hot",
        rating: 4.9,
        reviews: 241,
        availability: "In Stock",
        sku: "SV-JD-AJ4",
        stock: 10,
        sold: 0,
        description: "Iconic basketball heritage with premium materials.",
        colors: [
            {
                name: "White",
                hex: "#fff",
                images: [
                    "../assets/images/products/jordan/retro-4/air-jordan-4-retro-white.png"
                ]
            },
            {
                name: "Black",
                hex: "#000",
                images: [
                    "../assets/images/products/jordan/retro-4/air-jordan-4-retro-black.png"
                ]
            },
            {
                name: "Gray",
                hex: "#888888",
                images: [
                    "../assets/images/products/jordan/retro-4/air-jordan-4-retro-gray.png"
                ]
            }
        ],
        onFoot: [
            "../assets/images/products/jordan/retro-4/air-jordan-4-retro-onfoot-1.png",
            "../assets/images/products/jordan/retro-4/air-jordan-4-retro-onfoot-2.png"
        ],
        model3d: "../assets/models/air-jordan.glb"
    },

    {
        id: 4,
        name: "Puma RS",
        brand: "Puma",
        category: "Casual",
        price: 165,
        oldPrice: null,
        discount: "",
        image: "../assets/images/products/puma/puma-rs/puma-rs-green.png",
        badge: "Sale",
        rating: 4.6,
        reviews: 94,
        stock: 10,
        sold: 0,
        availability: "In Stock",
        sku: "SV-PM-RS",
        description: "Retro-inspired design with modern cushioning.",
        colors: [
            {
                name: "Green",
                hex: "#2ecc71",
                images: [
                    "../assets/images/products/puma/puma-rs/puma-rs-green.png"
                ]
            },
            {
                name: "Red",
                hex: "#e74c3c",
                images: [
                    "../assets/images/products/puma/puma-rs/puma-rs-red.png"
                ]
            },
            {
                name: "Black",
                hex: "#000",
                images: [
                    "../assets/images/products/puma/puma-rs/puma-rs-black.png"
                ]
            },
            {
                name: "White",
                hex: "#fff",
                images: [
                    "../assets/images/products/puma/puma-rs/puma-rs-white.png"
                ]
            }
        ],
        onFoot: [
            "../assets/images/products/puma/puma-rs/puma-rs-onfoot-1.png",
            "../assets/images/products/puma/puma-rs/puma-rs-onfoot-2.png"
        ],
        model3d: "../assets/models/puma-rsx.glb"
    },

    {
        id: 5,
        name: "Nike Dunk Low",
        brand: "Nike",
        category: "Casual",
        price: 130,
        oldPrice: null,
        discount: "",
        image: "../assets/images/products/nike/dunk-low/nike-dunk-low-blue-white.png",
        badge: "New",
        rating: 4.7,
        reviews: 162,
        stock: 10,
        sold: 0,
        availability: "In Stock",
        sku: "SV-NK-DL",
        description: "Classic basketball heritage with modern comfort.",
        colors: [
            {
                name: "Blue",
                hex: "#3498db",
                images: [
                    "../assets/images/products/nike/dunk-low/nike-dunk-low-blue-white.png"
                ]
            },
            {
                name: "Black",
                hex: "#000",
                images: [
                    "../assets/images/products/nike/dunk-low/nike-dunk-low-white-black.png"
                ]
            },
            {
                name: "Grey",
                hex: "#888888",
                images: [
                    "../assets/images/products/nike/dunk-low/nike-dunk-low-white-grey.png"
                ]
            },
            {
                name: "Brown",
                hex: "#7a4a2d",
                images: [
                    "../assets/images/products/nike/dunk-low/nike-dunk-low-brown.png"
                ]
            },
            {
                name: "UNC",
                hex: "#7bafd4",
                images: [
                    "../assets/images/products/nike/dunk-low/nike-dunk-low-unc.png"
                ]
            }
        ],
        onFoot: [
            "../assets/images/products/nike/dunk-low/nike-dunk-low-onfoot-1.png",
            "../assets/images/products/nike/dunk-low/nike-dunk-low-onfoot-2.png"
        ],
        model3d: "../assets/models/nike-airmax-270.glb"
    },

    {
        id: 6,
        name: "Adidas Samba OG",
        brand: "Adidas",
        category: "Casual",
        price: 110,
        oldPrice: null,
        discount: "",
        image: "../assets/images/products/adidas/samba-og/adidas-samba-og-black.png",
        badge: "Best Seller",
        rating: 4.8,
        reviews: 204,
        availability: "In Stock",
        sku: "SV-AD-SO",
        stock: 10,
        sold: 0,
        description: "Timeless sneaker with premium leather.",
        colors: [
            {
                name: "Black",
                hex: "#000",
                images: [
                    "../assets/images/products/adidas/samba-og/adidas-samba-og-black.png"
                ]
            },
            {
                name: "White",
                hex: "#fff",
                images: [
                    "../assets/images/products/adidas/samba-og/adidas-samba-og-white.png"
                ]
            },
            {
                name: "Green",
                hex: "#2ecc71",
                images: [
                    "../assets/images/products/adidas/samba-og/adidas-samba-og-green.png"
                ]
            }
        ],
        onFoot: [
            "../assets/images/products/adidas/samba-og/adidas-samba-og-onfoot-1.png",
            "../assets/images/products/adidas/samba-og/adidas-samba-og-onfoot-2.png"
        ],
        model3d: "../assets/models/adidas-ultraboost.glb"
    },

    {
        id: 7,
        name: "Air Jordan 1 Retro High OG",
        brand: "Jordan",
        category: "Basketball",
        price: 250,
        oldPrice: null,
        discount: "",
        image: "../assets/images/products/jordan/retro-1/air-jordan-1-retro-high-og-black.png",
        badge: "Hot",
        rating: 4.9,
        reviews: 318,
        availability: "In Stock",
        sku: "SV-JD-AJ1",
        stock: 10,
        sold: 0,
        description: "Legendary street style sneaker.",
        colors: [
            {
                name: "Black",
                hex: "#000",
                images: [
                    "../assets/images/products/jordan/retro-1/air-jordan-1-retro-high-og-black.png"
                ]
            },
            {
                name: "White",
                hex: "#fff",
                images: [
                    "../assets/images/products/jordan/retro-1/air-jordan-1-retro-high-og-white.png"
                ]
            },
            {
                name: "Blue",
                hex: "#3498db",
                images: [
                    "../assets/images/products/jordan/retro-1/air-jordan-1-retro-high-og-blue.png"
                ]
            },
            {
                name: "Grey",
                hex: "#888888",
                images: [
                    "../assets/images/products/jordan/retro-1/air-jordan-1-retro-high-og-grey.png"
                ]
            }
        ],
        onFoot: [
            "../assets/images/products/jordan/retro-1/air-jordan-1-retro-high-og-onfoot-1.png",
            "../assets/images/products/jordan/retro-1/air-jordan-1-retro-high-og-onfoot-2.png"
        ],
        model3d: "../assets/models/air-jordan.glb"
    },

    {
        id: 8,
        name: "Puma Speedcat OG",
        brand: "Puma",
        category: "Lifestyle",
        price: 140,
        oldPrice: null,
        discount: "",
        stock: 10,
        sold: 0,
        image: "../assets/images/products/puma/puma-speedcat/puma-speedcat-og-black.png",
        badge: "New",
        rating: 4.6,
        reviews: 91,
        availability: "In Stock",
        sku: "SV-PM-SC",
        description: "Motorsport-inspired sleek design.",
        colors: [
            {
                name: "Black",
                hex: "#000",
                images: [
                    "../assets/images/products/puma/puma-speedcat/puma-speedcat-og-black.png"
                ]
            },
            {
                name: "Red",
                hex: "#e74c3c",
                images: [
                    "../assets/images/products/puma/puma-speedcat/puma-speedcat-og-red.png"
                ]
            },
            {
                name: "Brown",
                hex: "#7a4a2d",
                images: [
                    "../assets/images/products/puma/puma-speedcat/puma-speedcat-og-brown.png"
                ]
            },
            {
                name: "Green",
                hex: "#2ecc71",
                images: [
                    "../assets/images/products/puma/puma-speedcat/puma-speedcat-og-green.png"
                ]
            }
        ],
        onFoot: [
            "../assets/images/products/puma/puma-speedcat/puma-speedcat-og-onfoot-1.png",
            "../assets/images/products/puma/puma-speedcat/puma-speedcat-og-onfoot-2.png"
        ],
        model3d: "../assets/models/puma-rsx.glb"
    }

];