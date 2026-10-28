# Product API Spec

## Create Product API

Endpoint : POST /api/products

Headers : 
- Authorization : token

Request Body :

```json
{
    "data" : {
        "cover" : "nama image cover",
        "judul_buku" : "judul buku",
        "nama_penulis" : "nama penulis",
        "deskripsi_buku" : "deskripsi buku",
        "harga" : "70000"
    }
}
```

Response Body Success :

```json
{
    "data" : {
        "id" : 1,
        "cover" : "nama image cover",
        "judul_buku" : "judul buku",
        "nama_penulis" : "nama penulis",
        "deskripsi_buku" : "deskripsi buku",
        "harga" : "70000"
    }
}
```

Response Body Error :

```json
{
    "errors" : "book name alredy exist"
}
```

## Update Product API

Endpoint : PUT /api/products/:id

Headers : 
- Authorization : token

Request Body :

```json
{
    "data" : {
        "cover" : "nama image cover",
        "judul_buku" : "judul buku",
        "nama_penulis" : "nama penulis",
        "deskripsi_buku" : "deskripsi buku",
        "harga" : "70000"
    }
}
```

Response Body Success :

```json
{
    "data" : {
        "id" : 1,
        "cover" : "nama image cover",
        "judul_buku" : "judul buku",
        "nama_penulis" : "nama penulis",
        "deskripsi_buku" : "deskripsi buku",
        "harga" : "70000"
    }
}
```

Response Body Error :

```json
{
    "errors" : "book name alredy exist"
}
```

## Get Product API

Endpoint : GET /api/products/:id

Headers : 
- Authorization : token

Response Body Success :

```json
{
    "data" : {
        "id" : 1,
        "cover" : "nama image cover",
        "judul_buku" : "judul buku",
        "nama_penulis" : "nama penulis",
        "deskripsi_buku" : "deskripsi buku",
        "harga" : "70000"
    }
}
```

Response Body Error :

```json
{
    "errors" : "product is not found"
}
```

## Search Product API

Endpoint : GET /api/products

Headers : 
- Authorization : token

Query params :
- judul : search by judul, using like, optional
- penulis : search by penulis, using like, optional
- harga : search by harga, using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
    "data" : [
        {
        "id" : 1,
        "cover" : "nama image cover",
        "judul_buku" : "judul buku",
        "nama_penulis" : "nama penulis",
        "deskripsi_buku" : "deskripsi buku",
        "harga" : "70000"
        },
        {
        "id" : 2,
        "cover" : "nama image cover",
        "judul_buku" : "judul buku",
        "nama_penulis" : "nama penulis",
        "deskripsi_buku" : "deskripsi buku",
        "harga" : "70000"
        },
    ],
    "paging" : {
        "page" : 1,
        "total_page" : 3,
        "total_item" : 30
    }
}
```

Response Body Error :

```json
{

}
```

## Remove Product API

Endpoint : DELETE /api/products/:id

Headers : 
- Authorization : token

Response Body Success :

```json
{
    "data" : "ok"
}
```

Response Body Error :

```json
{
    "errors" : "product is not found"
}
```