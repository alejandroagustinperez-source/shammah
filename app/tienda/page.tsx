"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import MLProductCard, { MLProduct } from "@/components/MLProductCard";
import { products as artisanProducts } from "@/data/products";

interface TiendaCategory {
  id: string;
  label: string;
  emoji: string;
  type: "artisan" | "ml";
}

const allCategories: TiendaCategory[] = [
  { id: "baberos", label: "Baberos", emoji: "🍼", type: "artisan" },
  { id: "portachupetes", label: "Portachupetes", emoji: "🌈", type: "artisan" },
  { id: "babitas", label: "Babitas", emoji: "☁️", type: "artisan" },
  { id: "mantas", label: "Mantas", emoji: "🧸", type: "artisan" },
  { id: "muneco", label: "Muñecos de tela", emoji: "🪆", type: "artisan" },
  { id: "cunas", label: "Cunas", emoji: "🛏️", type: "ml" },
  { id: "silla-auto", label: "Silla para el auto", emoji: "🚗", type: "ml" },
  { id: "cochecito", label: "Cochecito de paseo", emoji: "👶", type: "ml" },
  { id: "paniales", label: "Pañales", emoji: "🧷", type: "ml" },
  { id: "chupetes", label: "Chupetes", emoji: "🍭", type: "ml" },
  { id: "biberon", label: "Biberón", emoji: "🍼", type: "ml" },
  { id: "saca-leche", label: "Saca leche", emoji: "🤱", type: "ml" },
  { id: "banadera", label: "Bañadera", emoji: "🛁", type: "ml" },
  { id: "jabon", label: "Jabón", emoji: "🧴", type: "ml" },
  { id: "mochila", label: "Mochila maternal", emoji: "🎒", type: "ml" },
  { id: "corralito", label: "Corralito", emoji: "🛡️", type: "ml" },
  { id: "silla-mecedora", label: "Silla mecedora", emoji: "🪑", type: "ml" },
  { id: "oleo", label: "Óleo calcáreo", emoji: "🧪", type: "ml" },
  { id: "manta-caminadora", label: "Manta caminadora", emoji: "🧶", type: "ml" },
  { id: "aspirador", label: "Aspirador nasal", emoji: "💨", type: "ml" },
  { id: "silla-comer", label: "Silla de comer", emoji: "🍽️", type: "ml" },
  { id: "camara", label: "Cámara", emoji: "📷", type: "ml" },
  { id: "piso", label: "Piso encastrable", emoji: "🧩", type: "ml" },
];

const mlProductsMap: Record<string, MLProduct[]> = {
  cunas: [
    {
      name: "Cuna Colecho Con Colchon Baranda Desmontable Escritorio 5en1 Blanco",
      price: 178186,
      originalPrice: 217300,
      discount: "18% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_795214-MLA96242570891_102025-F.webp",
      href: "https://meli.la/1HDPjJC",
      installments: "6 cuotas de $39.557",
    },
    {
      name: "Cuna De Bebé Estrella Mega Baby De Madera Eléctrica Mecedora Color Grey",
      price: 199471,
      originalPrice: 219199,
      discount: "9% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_870504-MLA99504562938_112025-F.webp",
      href: "https://meli.la/1YFWoab",
      installments: "6 cuotas de $44.282",
    },
    {
      name: "Cuna Colecho Convertible 6en1 | Incluye Colchón - 100x50 Cm Blanco",
      price: 191905,
      originalPrice: 230205,
      discount: "16% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_669731-MLA95625301714_102025-F.webp",
      href: "https://meli.la/2LU8B6m",
      installments: "6 cuotas de $31.984",
    },
    {
      name: "Cuna Con Colchon Ruedas Con Freno Colecho Escritorio 5 En 1 Blanco",
      price: 193356,
      originalPrice: 235800,
      discount: "18% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_924820-MLA109857297762_042026-F.webp",
      href: "https://meli.la/1yYQHrx",
      installments: "6 cuotas de $42.925",
    },
  ],
  "silla-auto": [
    {
      name: "Butaca Silla Para Auto Bebé Avanti Homologada 0-25 Kgs Color Plateado",
      price: 129097,
      originalPrice: 220339,
      discount: "41% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_664026-MLA84555801344_052025-F.webp",
      href: "https://meli.la/2v7JSKc",
      installments: "6 cuotas de $28.659",
    },
    {
      name: "Butaca Auto Bebé Last Ayrton Mega Baby Convertible 0-25 Kg",
      price: 132511,
      originalPrice: 155896,
      discount: "15% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_820679-MLA108877259217_032026-F.webp",
      href: "https://meli.la/2JyaEjZ",
      installments: "6 cuotas de $29.417",
    },
    {
      name: "Butaca Booster Auto Bebé Mega Baby Daytona I-size 9 A 36 Kg Color Gris",
      price: 121579,
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_993247-MLA111275265241_052026-F.webp",
      href: "https://meli.la/2aBa7aN",
      installments: "6 cuotas de $26.990",
    },
    {
      name: "Booster Auto Bebe Mega Baby Silverstone 3 En 1 De 9 A 36 Kg Color Negro",
      price: 94502,
      originalPrice: 111179,
      discount: "15% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_907210-MLA109740334113_032026-F.webp",
      href: "https://meli.la/1zcXW65",
      installments: "6 cuotas de $20.979",
    },
    {
      name: "Butaca Booster Elevador Mega Baby Silverstone Gris De 9-6 Kg",
      price: 111179,
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_708726-MLA108034619534_032026-F.webp",
      href: "https://meli.la/2YXSr4F",
      installments: "6 cuotas de $24.681",
    },
    {
      name: "Butaca Infantil Para Auto Mega Baby Last Ayrton Last Gris/Negro",
      price: 132515,
      originalPrice: 155900,
      discount: "15% OFF",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_766150-MLA108877533679_032026-F.webp",
      href: "https://meli.la/1dDGo6C",
      installments: "6 cuotas de $29.418",
    },
  ],
  cochecito: [
    {
      name: "Chicco Coche De Paseo Glee Uneven Black Color Negro Chasis Negro",
      price: 209270,
      originalPrice: 499270,
      discount: "58% OFF",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_605899-MLA95395067658_102025-F.webp",
      href: "https://meli.la/2uhQaBh",
      installments: "6 cuotas de $34.878",
    },
    {
      name: "Chicco Coche De Paseo Glee Playful Black Negro",
      price: 189390,
      originalPrice: 499390,
      discount: "62% OFF",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_989864-MLA80807741444_112024-F.webp",
      href: "https://meli.la/1XnHdmJ",
      installments: "6 cuotas de $31.565",
    },
    {
      name: "Cochecito Avanti Dallas Cuna Reversible 6 Ruedas",
      price: 95738,
      originalPrice: 198079,
      discount: "51% OFF",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_670006-MLA89217533051_082025-F.webp",
      href: "https://meli.la/2QJJyDj",
      installments: "12 cuotas de $7.978",
    },
  ],
  paniales: [
    {
      name: "Pañales Pampers Deluxe Protection Talle XXG 34 Un Extra Extra Grande",
      price: 50551,
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_748591-MLA99918803271_112025-F.webp",
      href: "https://meli.la/1Mkyf1C",
      installments: "6 cuotas de $11.222",
    },
    {
      name: "Pañales Huggies Pants Soft Comfort XXG X 24un Extra Extra Grande",
      price: 18205,
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_713278-MLA99332044964_112025-F.webp",
      href: "https://meli.la/1iXF1Ze",
    },
    {
      name: "Pañales Babysec Premium Soft M X48u Sin Género Tamaño Mediano",
      price: 19500,
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_728502-MLA99441279000_112025-F.webp",
      href: "https://meli.la/1dGUVdd",
    },
    {
      name: "Pañales Huggies Flexi Comfort XG Paquete De 52 Unidades Extra Grande",
      price: 26050,
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_831516-MLA99335361420_112025-F.webp",
      href: "https://meli.la/1BkSsXp",
    },
    {
      name: "Pañales Unisex Premium Care Pants 46uds XXXG Pampers Sin Género",
      price: 32999,
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_933219-MLA101577639861_122025-F.webp",
      href: "https://meli.la/2ztK6dM",
    },
    {
      name: "Pañales Estrella Baby Super Pack XG X 52 Un Tamaño Extra Grande",
      price: 25999,
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_713396-MLA101779394650_122025-F.webp",
      href: "https://meli.la/26nsYfN",
    },
    {
      name: "Pañales Pampers Babydry Recien Nacido RN+ 36u Sin Género",
      price: 18524,
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_909232-MLA99818421729_112025-F.webp",
      href: "https://meli.la/2PVRmkW",
    },
    {
      name: "Pañales Babysec Premium Soft Violeta Hiper XXG De 30u +13kg Tamaño Extra Grande",
      price: 16899,
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_998885-MLA99927800429_112025-F.webp",
      href: "https://meli.la/1sZyCWo",
    },
    {
      name: "Pañales Pampers Deluxe Protection Talle G 44 Un Grande Sin Género",
      price: 30744,
      originalPrice: 52028,
      discount: "40% OFF",
      badge: "Oferta imperdible",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_755978-MLA99451953736_112025-F.webp",
      href: "https://meli.la/33M4y1o",
    },
    {
      name: "Pañales Huggies Dermacare Etapa 2/m 58 U Mediano Sin Género",
      price: 25000,
      originalPrice: 30999,
      discount: "19% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_740815-MLA99929198885_112025-F.webp",
      href: "https://meli.la/2nHXLmY",
    },
    {
      name: "Pañales Estrella Baby Talle XXG Pack Ahorro X 50 Unidades Descartables",
      price: 20499,
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_610648-MLA99926902737_112025-F.webp",
      href: "https://meli.la/2VUFmQN",
    },
    {
      name: "Pañales Toddler Deluxe Talle XG X30 Extra Grande Sin Género",
      price: 13100,
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_750203-MLA99387217930_112025-F.webp",
      href: "https://meli.la/2VaGT8y",
    },
    {
      name: "Pañal Huggies Protect Plus XXXG X48 Extra Extra Extra Grande",
      price: 26992,
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_843814-MLA99435061932_112025-F.webp",
      href: "https://meli.la/2kBvLAe",
    },
    {
      name: "Pañales Estrella Baby Super Pack G X 60 Un Tamaño Grande",
      price: 23560,
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_667021-MLA99440393390_112025-F.webp",
      href: "https://meli.la/2X3Vvbw",
    },
    {
      name: "Pañales Duffy Cotton XXG Para Más De 13kg Pack De 42 Unidades Extra Extra Grande",
      price: 17265,
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_718188-MLA110864868214_052026-F.webp",
      href: "https://meli.la/2KirHV5",
    },
    {
      name: "Estrella Baby Hiperpack 1ra Calidad Tamaño XG X36 Uds Extra Grande",
      price: 17105,
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_728029-MLA99926989725_112025-F.webp",
      href: "https://meli.la/1CNT6P5",
    },
    {
      name: "Huggies Natural Care XXXG X48 + Toallitas Huggies 4 En 1 X48 XXXG Sin Género",
      price: 31500,
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_813873-MLA104655904753_012026-F.webp",
      href: "https://meli.la/1JnyTke",
    },
  ],
  chupetes: [
    {
      name: "Chupetes Philips Avent Ultra Air Scf376/21 6-18 M X 2 Color Celeste",
      price: 12999,
      originalPrice: 29206,
      discount: "55% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_759526-MLA105238408294_012026-F.webp",
      href: "https://meli.la/1KLFg98",
    },
  ],
  biberon: [
    {
      name: "Set X5 Cepillos Limpadores De Botellas Mamaderas Biberones Jarras Vasos",
      price: 11999,
      originalPrice: 38999,
      discount: "69% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_807930-MLA109813090946_042026-F.webp",
      href: "https://meli.la/1iyDSeh",
    },
    {
      name: "Set Recien Nacido Avent Natural Response Biberones Mamaderas",
      price: 63942,
      originalPrice: 76500,
      discount: "16% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_737100-MLA99504840732_112025-F.webp",
      href: "https://meli.la/12MYse4",
      installments: "6 cuotas de $14.195",
    },
  ],
  "saca-leche": [
    {
      name: "Extractor De Leche Eléctrico Mawe By Gadnic Rh-289 150 Ml 9 Niveles Pantalla",
      price: 37799,
      originalPrice: 45999,
      discount: "17% OFF",
      badge: "Oferta imperdible",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_827587-MLA99986097933_112025-F.webp",
      href: "https://meli.la/1kPw7kf",
    },
    {
      name: "Sacaleche Extractor Eléctrico Doble Alltomom Ac6834",
      price: 29968,
      originalPrice: 35257,
      discount: "15% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_709964-MLA91946597439_092025-F.webp",
      href: "https://meli.la/13J1RZL",
    },
    {
      name: "Sacaleche Eléctrico Alltomom 6811 Usb 4 Velocidades Blanco",
      price: 24752,
      originalPrice: 29120,
      discount: "15% OFF",
      badge: "Oferta imperdible",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_884325-MLA108638627392_032026-F.webp",
      href: "https://meli.la/16MC4R1",
    },
    {
      name: "Sacaleche Eléctrico Inalámbrico Mawe By Gadnic Scl82 9 Niveles 3 Modos",
      price: 69949,
      originalPrice: 148249,
      discount: "52% OFF",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_709558-MLA99987107485_112025-F.webp",
      href: "https://meli.la/2juv6Po",
      installments: "6 cuotas de $15.528",
    },
    {
      name: "Sacaleches Mave By Gadnic D-115 Kit Doble Pro Extractor Automático Sin Bpa",
      price: 49999,
      originalPrice: 96949,
      discount: "48% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_720949-MLA96662267844_112025-F.webp",
      href: "https://meli.la/2kgdCvr",
      installments: "6 cuotas de $11.099",
    },
    {
      name: "Sacaleche Eléctrico Inalámbrico Mawe By Gadnic Scl82 9 Niveles 3 Modos",
      price: 69949,
      originalPrice: 150149,
      discount: "53% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_782108-MLA102497452900_122025-F.webp",
      href: "https://meli.la/1zdAmWU",
      installments: "6 cuotas de $15.528",
    },
    {
      name: "Sacaleche Manual Mawe By Gadnic Brp00104 180ml Siliconada Manija",
      price: 16299,
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_890025-MLA84559324526_052025-F.webp",
      href: "https://meli.la/2K5G4pG",
      installments: "9 cuotas de $1.811",
    },
  ],
  banadera: [
    {
      name: "Love B330 Bañera Plegable Color Rosa 77cm X 43cm X 20cm Con Diseño",
      price: 32929,
      originalPrice: 44499,
      discount: "26% OFF",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_940757-MLA99989362939_112025-F.webp",
      href: "https://meli.la/24gx1Fz",
    },
    {
      name: "Bañera Plegable Love B330 Color Gris 77cm X 43cm X 20cm Con Diseño",
      price: 32929,
      originalPrice: 44499,
      discount: "26% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_814193-MLA99463706918_112025-F.webp",
      href: "https://meli.la/2DSoto8",
    },
    {
      name: "Bañera Bebe Ultra Plegable Avanti Mid Reductor Y Termometro Gris Liso",
      price: 47301,
      originalPrice: 79999,
      discount: "40% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_974822-MLA88845608876_082025-F.webp",
      href: "https://meli.la/1cyftUQ",
      installments: "6 cuotas de $10.500",
    },
    {
      name: "Bañera Plegable Avanti Fresh Reductor + Termómetro",
      price: 34676,
      originalPrice: 70767,
      discount: "51% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_800807-MLA89090534578_082025-F.webp",
      href: "https://meli.la/1VU6i5v",
    },
    {
      name: "Bañera Para Bebés Avanti Splash Plegable Reposera Termometro",
      price: 39999,
      originalPrice: 99999,
      discount: "60% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_983726-MLA95393548732_102025-F.webp",
      href: "https://meli.la/15yCuDm",
    },
    {
      name: "Bañera Avanti Mid Ultra Plegable + Reductor Termometro",
      price: 46206,
      originalPrice: 99901,
      discount: "53% OFF",
      badge: "Oferta imperdible",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_878665-MLA107415458167_022026-F.webp",
      href: "https://meli.la/1oKgrjt",
      installments: "12 cuotas de $3.850",
    },
  ],
  jabon: [
    {
      name: "Jabón En Barra Baby Dove Humectación Enriquecida 75g",
      price: 3260,
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_882612-MLA99880313765_112025-F.webp",
      href: "https://meli.la/2HZU5Hu",
    },
    {
      name: "Dove Original Jabón En Barra Blanco 3x90g",
      price: 6755,
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_851292-MLA99833638811_112025-F.webp",
      href: "https://meli.la/2Z2gCoJ",
    },
  ],
  mochila: [
    {
      name: "Mochila Maternal Termica Cuna Cambiador Bolsillo Impermeable",
      price: 29999,
      originalPrice: 49999,
      discount: "40% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_950298-MLA109865071567_032026-F.webp",
      href: "https://meli.la/1KiwoKW",
    },
  ],
  corralito: [
    {
      name: "Mega Baby Manta Corralito Gimnasio Didáctica Bebe 3 En 1 Con Pelotas",
      price: 100572,
      originalPrice: 106991,
      discount: "6% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_763496-MLA88303387775_072025-F.webp",
      href: "https://meli.la/1JGQLWi",
      installments: "6 cuotas de $16.762",
    },
    {
      name: "Corralito Juegos Bebé Portable 180x120 Trapani Belluno Baby Gris Liso",
      price: 199990,
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_661422-MLA91243848264_092025-F.webp",
      href: "https://meli.la/1TpWoAZ",
      installments: "6 cuotas de $44.397",
    },
  ],
  "silla-mecedora": [
    {
      name: "Silla Mecedora Mega Baby 27267 18 Kg Vibración Y Música Color Gris",
      price: 83098,
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_602877-MLA99563623518_122025-F.webp",
      href: "https://meli.la/23kCwLA",
      installments: "6 cuotas de $18.447",
    },
  ],
  oleo: [
    {
      name: "Oleo Calcareo Estrella Baby Sin Fragancia X 950 Ml Con Extracto De Algodon",
      price: 9918,
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_615448-MLA99440537480_112025-F.webp",
      href: "https://meli.la/1sdKo8S",
    },
  ],
  "manta-caminadora": [
    {
      name: "Mega Baby Manta Corralito Gimnasio Didáctica Bebe 3 En 1 Con Pelotas",
      price: 100572,
      originalPrice: 106991,
      discount: "6% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_763496-MLA88303387775_072025-F.webp",
      href: "https://meli.la/1JGQLWi",
      installments: "6 cuotas de $16.762",
    },
    {
      name: "Manta Caminador 2 En 1 Mega Baby Gimnasio Alfombra Didactica",
      price: 37924,
      originalPrice: 44617,
      discount: "15% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_858933-MLA96146061631_102025-F.webp",
      href: "https://meli.la/2KxiCzJ",
    },
  ],
  aspirador: [
    {
      name: "Aspirador Nasal Gadnic Eléctrico Automático Silencioso Bebes Lavable",
      price: 60349,
      originalPrice: 65999,
      discount: "8% OFF",
      badge: "Oferta imperdible",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_996027-MLA100385479993_122025-F.webp",
      href: "https://meli.la/1LGbpu9",
      installments: "6 cuotas de $13.397",
    },
    {
      name: "Aspirador Nasal Automátic Aspen Delfín Anm12 12 Melodías Saca Moco",
      price: 49999,
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_665865-MLA99990303053_112025-F.webp",
      href: "https://meli.la/2X4MgB9",
      installments: "6 cuotas de $11.099",
    },
  ],
  "silla-comer": [
    {
      name: "Silla Comer Bebe Plegable Baby Pops 2 En 1 Celeste Con Ruedas",
      price: 87897,
      originalPrice: 137339,
      discount: "36% OFF",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_827116-MLA106091185635_012026-F.webp",
      href: "https://meli.la/32M4pLM",
      installments: "6 cuotas de $19.513",
    },
    {
      name: "Silla De Comer Motek Emily 3 En 1 Con Bandeja Extraíble Gris",
      price: 62930,
      originalPrice: 89900,
      discount: "30% OFF",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_987475-MLA110076631585_042026-F.webp",
      href: "https://meli.la/1vCjHF8",
      installments: "6 cuotas de $13.970",
    },
    {
      name: "Silla Comer Bebé Mega Baby Venecia Doble Bandeja Y Juguetes Color Beige",
      price: 94145,
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_741939-MLA110167117214_042026-F.webp",
      href: "https://meli.la/19YbbYm",
      installments: "9 cuotas de $10.460",
    },
    {
      name: "Silla De Comer Bebe Avanti Full 3 En 1 Alta Baja Booster",
      price: 46999,
      originalPrice: 151591,
      discount: "69% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_624703-MLA110941145511_042026-F.webp",
      href: "https://meli.la/136qxBA",
      installments: "6 cuotas de $10.433",
    },
    {
      name: "Silla Comer Para Bebé Avanti Plegable Bandeja",
      price: 65309,
      originalPrice: 197283,
      discount: "66% OFF",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_645596-MLA98761488105_112025-F.webp",
      href: "https://meli.la/1vaL6fM",
      installments: "12 cuotas de $5.442",
    },
  ],
  camara: [
    {
      name: "Baby Call Monitor Gadnic Cámara Con Visión Nocturna Para Bebes Audio Video",
      price: 73299,
      originalPrice: 132849,
      discount: "44% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_914463-MLA110384806949_042026-F.webp",
      href: "https://meli.la/2vJiDcY",
      installments: "6 cuotas de $16.272",
    },
    {
      name: "Camara Baby Monitor Baby Call Vision Nocturna Bebe Unico",
      price: 121799,
      originalPrice: 222349,
      discount: "45% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_678054-MLA111648806769_052026-F.webp",
      href: "https://meli.la/1wWc39Y",
      installments: "6 cuotas de $27.039",
    },
    {
      name: "Camara Baby Monitor Baby Call Vision Nocturna Bebe Unico",
      price: 121799,
      originalPrice: 222349,
      discount: "45% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_678054-MLA111648806769_052026-F.webp",
      href: "https://meli.la/1wWc39Y",
      installments: "6 cuotas de $27.039",
    },
    {
      name: "Baby Monitor Gadnic Pantalla Lcd 4.3 Vision Nocturna Audio 2 Vias Vox Bateria",
      price: 121799,
      originalPrice: 237849,
      discount: "48% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_963402-MLA99536300998_122025-F.webp",
      href: "https://meli.la/2mjRDKp",
      installments: "6 cuotas de $27.039",
    },
    {
      name: "Baby Call Cámara De Seguridad Wifi Visión Nocturna",
      price: 31040,
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_815962-MLA99991261065_112025-F.webp",
      href: "https://meli.la/2pbXdED",
    },
    {
      name: "Baby Monitor Babycall Gadnic Cambeb48 Audio Bidireccional Pantalla Lcd 2 Visión",
      price: 60899,
      originalPrice: 246949,
      discount: "75% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_988771-MLA99932748559_112025-F.webp",
      href: "https://meli.la/2WZzN6d",
      installments: "6 cuotas de $13.519",
    },
  ],
  piso: [
    {
      name: "Piso Encastrable De Goma Eva Con Bordes Texturizado Negro Pack De 4 Piezas",
      price: 21990,
      originalPrice: 35990,
      discount: "38% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_613140-MLA111356582607_052026-F.webp",
      href: "https://meli.la/2V6xyAE",
    },
    {
      name: "Pack X 4 Piso Goma Eva Encastrable + Bordes 60 X 60cm Gym Color Negro",
      price: 19989,
      originalPrice: 39978,
      discount: "50% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_951131-MLA110691200218_052026-F.webp",
      href: "https://meli.la/2mUiHPP",
    },
  ],
};

export default function TiendaPage() {
  const [activeCategory, setActiveCategory] = useState("baberos");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-category-id");
            if (id) setActiveCategory(id);
          }
        }
      },
      { rootMargin: "-90px 0px -55% 0px" }
    );

    const sections = document.querySelectorAll("[data-category-id]");
    sections.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollToCategory = (id: string) => {
    const el = document.querySelector(`[data-category-id="${id}"]`);
    el?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fdfaf7]">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-[#9b8bb4] hover:text-[#7b5ea7] text-xs sm:text-sm font-semibold transition-colors"
        >
          ← Volver
        </Link>
        <h1 className="font-display text-xl sm:text-2xl text-[#9b8bb4]">Tienda</h1>
        <div className="w-20 sm:w-28" />
      </div>

      <div className="max-w-7xl mx-auto lg:flex lg:gap-6 px-3 sm:px-4">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <nav className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto space-y-0.5 scrollbar-hide">
            <div className="text-xs font-bold uppercase tracking-wider text-[#b8a8cc] mb-3 pl-3">
              Categorías
            </div>
            {allCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? "bg-[#d4b8e0] text-white shadow-sm"
                    : "text-[#7b5ea7] hover:bg-[#f0ecf8]"
                }`}
              >
                <span className="flex-shrink-0">{cat.emoji}</span>
                <span className="truncate">{cat.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile hamburger + drawer */}
        <div className="lg:hidden sticky top-0 z-20 mb-4 sm:mb-6">
          <div className="bg-[#fdfaf7]/90 backdrop-blur border-b border-[#e8e0f0] px-3 py-2.5 flex items-center justify-between">
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f0ecf8] hover:bg-[#e0d4ec] text-[#7b5ea7] font-semibold text-sm transition-all active:scale-95"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              Categorías
            </button>
            <span className="text-xs text-[#9b8bb4] font-semibold">
              {activeCategory ? allCategories.find(c => c.id === activeCategory)?.label : ""}
            </span>
          </div>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/40 z-30"
                onClick={() => setMenuOpen(false)}
              />
              <div className="fixed top-0 left-0 right-0 z-40 bg-white rounded-b-2xl shadow-xl max-h-[60vh] overflow-y-auto">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#f0ecf8]">
                  <span className="font-bold text-[#4a4a4a] text-sm">Categorías</span>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f0ecf8] text-[#9b8bb4] hover:bg-[#d4b8e0] hover:text-white transition-all"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <div className="py-1">
                  {allCategories.map((cat, i) => (
                    <button
                      key={cat.id}
                      onClick={() => scrollToCategory(cat.id)}
                      className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all ${
                        activeCategory === cat.id
                          ? "bg-[#f0ecf8] text-[#7b5ea7] font-bold"
                          : "text-[#4a4a4a] font-semibold hover:bg-[#faf8ff]"
                      } ${i < allCategories.length - 1 ? "border-b border-[#f0ecf8]" : ""}`}
                    >
                      <span className="text-lg">{cat.emoji}</span>
                      <span className="text-sm">{cat.label}</span>
                      {cat.type === "ml" && (
                        <span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-white bg-[#9b8bb4] px-1.5 py-0.5 rounded-full">ML</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <main className="flex-1 min-w-0 pb-16">
          {/* Artisan sections */}
            {allCategories
            .filter((c) => c.type === "artisan")
            .map((cat) => {
              const filtered = artisanProducts.filter((p) => p.category === cat.id);
              return (
                <section
                  key={cat.id}
                  data-category-id={cat.id}
                  className="mb-10 sm:mb-14 scroll-mt-24"
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
                    <span className="text-2xl sm:text-3xl">{cat.emoji}</span>
                    <h2 className="font-display text-lg sm:text-2xl text-[#9b8bb4]">
                      {cat.label}
                    </h2>
                    <div className="flex-1 h-px bg-[#ede0f5]" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
                    {filtered.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </section>
              );
            })}

          {/* ML sections */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl">🛒</span>
              <h2 className="font-display text-lg sm:text-2xl text-[#9b8bb4]">
                Productos de Mercado Libre
              </h2>
              <div className="flex-1 h-px bg-[#ede0f5]" />
            </div>
          </div>

          {allCategories
            .filter((c) => c.type === "ml")
            .map((cat) => {
              const products = mlProductsMap[cat.id] || [];
              return (
                <section
                  key={cat.id}
                  data-category-id={cat.id}
                  className="mb-10 sm:mb-14 scroll-mt-24"
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
                    <span className="text-2xl sm:text-3xl">{cat.emoji}</span>
                    <h2 className="font-display text-lg sm:text-2xl text-[#9b8bb4]">
                      {cat.label}
                    </h2>
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white bg-[#9b8bb4] px-1.5 sm:px-2 py-0.5 rounded-full">
                      ML
                    </span>
                    <div className="flex-1 h-px bg-[#ede0f5]" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {products.map((p, i) => (
                      <MLProductCard key={i} product={p} />
                    ))}
                  </div>
                </section>
              );
            })}
        </main>
      </div>
    </div>
  );
}
