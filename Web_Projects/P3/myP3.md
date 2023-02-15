Sprint1

news, review cards 


<img src="./Src_md/newsCard.png" width=40%>

<img src="./Src_md/reviewCard.png" width=40%>

Card应该向下传递card get dto 返回的object

```react
Card{
    state{
        ariticleGetDto{
            author,
            cover_url,
            createdTime,
            title
        }
    }
}

```


基本上一个card分为3个部分：
+ top: pic
+ middle: article title
+ bottom: post date, author