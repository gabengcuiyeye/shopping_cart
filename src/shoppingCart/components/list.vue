<template lang="pug">
    div.content_wrap
        div.content_left
            h3 商品列表
            div.item(v-for='list in mess',@click='add_to_cart',:id='list.f_id')
                div.img_wrap
                    img(:src='list.f_avatar')
                span {{list.f_name}}

        div#content_right.content_right
            h3 购物车
            div.item(v-for='list in cart_mess',:id='list.f_id')
                div.img_wrap
                    img(:src='list.f_avatar')
                span {{list.f_name}}
                div.delete_layer
                p.delete(@click="delete_item") 删除
</template>
<style lang="sass">
    .content_wrap{
        width: 800px;
        margin: 0 auto;
    }
    .content_left{
        float:left;
        width: 50%;
    .img_wrap{
        width: 120px;
        height: 120px;
    }
    }
    .item{
        width: 120px;
        float:left;
        text-align:center;
        margin-right:20px;
        font-size:12px;
        list-style:none;
        margin-bottom:20px;
    img{
        width: 120px;
        height:120px;
    }
    }
    .content_right{
        float: left;
        width: 50%;
        background-color: #e3e3e3;
        min-height: 800px;
        .delete_layer{
            height: 136px;
            background-color: rgba(54, 54, 54, 0.9);
            position: absolute;
            top:0;
            left:0;
            width:100%;
            display:none;
            p{
                text-align: center;
                font-size: 14px;
                position: relative;
                top:50%;
                margin-top: -10px;
                height: 20px;
                line-height: 20px;
                color: #fff;
            }
        }
        .item{
            position: relative;
        }
        .item:hover{
            .delete_layer{
                display: block;
            }
        }
    }
</style>
<script type="text/javascript">
    import Vue from 'vue'
    export default {
        data(){
            return {
                mess:list_data,
                cart_mess:cart_data
            }
        },
        methods:{
            add_to_cart:function (e) {
                let _this = this,
                    tar = e.currentTarget;
                let item_id = parseInt(tar.id);//vue获取当前dom对象
                this.$http.post('/add_to_cart',{id:2333,item_id:item_id})
                    .then(response => {
                        if(response.data.errcode ===1 ){
                            console.log('加入购物车成功');
                            _this.cart_mess.push({
                                f_id:item_id,
                                f_avatar:tar.children[0].children[0].getAttribute('src'),
                                f_name:'joijoi'
                            });

                        }else if(response.data.errcode ===2){
                            alert('已经添加过了哦');
                        }
                }, response => {
                    // error callback
                });
            },
            delete_item:function(e){
                console.log(e.currentTarget.parentElement);
                let tar = e.currentTarget,
                    item_id = parseInt(tar.parentElement.id);
                this.$http.post('/delete_item',{user_id:2333,item_id:item_id}).then(response => {
                    if(response.data.errcode===0){
                        let pNode = tar.parentElement;
                        while (pNode.children[0]){
                            pNode.removeChild(pNode.children[0]);
                        }

                    }
                }, response => {

                });
            }
        },
        init:function(){
        }
    }
</script>
