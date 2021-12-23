
// To run it use command npm run start
let app = new Vue({
    el: "#app",
    data: {
        users: [],
        user_id: null,
        username_post: '',
        content_post: '',
        time_post: new Date(),
        getUsername: localStorage.getItem("username"),
        isLogin: localStorage.length>0,
        isShow: false,
        isedit: false,
        SearchName:'',
        countLike: 0,
        isLike: false,   
    },
    mounted() {
        this.getUser();
    },
    methods: {
        //search user by name
        Search_Name(){
            this.users = [];
            axios.get("http://localhost:5000/post").then(res =>{
                let USERS = res.data;
                for (let user of USERS){
                    if (user.username === this.SearchName){
                        this.users.push(user)
                    }
                }

                this.SearchName = "";
            })

        },
        // user login
        Login() {
            localStorage.setItem("username", this.username_post);
            location.href= "http://localhost:5000/";
            
        },
        //user logout  
        Logout() {
            location.href= "http://localhost:5000/";
            localStorage.clear();
            
        },
        // show form when click on button create
        Create () {
            this.isShow= true;
            
        },
        // create post
        Add_post(){
            if (this.time_post.getHours() >=12 ){
                ampm = "PM";
        
            }else{
                ampm = "AM";
            };
            let user={
                like: this.countLike,
                username: this.getUsername,
                content: this.content_post,
                time: this.time_post.getFullYear() +"/"+ (this.time_post.getMonth()+1) +"/"+ (this.time_post.getDate())+ "-" + this.time_post.getHours() + ":" + this.time_post.getMinutes()+ ampm
            };
            
            let URL = "http://localhost:5000/post";
            axios
            .post(URL,user)
            .then(res => {
                
                location.href= "http://localhost:5000/";
                    
            });
            this.content_post = "";

        },
        // GET POST
        getUser() {
            let URL = "http://localhost:5000/post";
            axios
            .get(URL)
            .then(res => {
                
                this.users =  res.data;
                
                
            })
        },

        // DELETE POST
        deletePost(userID) {
            
            let id = userID;
            
            let URL = "http://localhost:5000/post/" + id;
            
            axios
            .delete(URL)
            .then(res => {
                
                location.href= "http://localhost:5000/"; 
              
            });
        },
        // display data on form when click on button edit
        edit_post (user){
            this.isedit= true;
            this.isShow = true;
            this.content_post= user.content;
            this.user_id = user.id;
            this.time_post= user.time;
            this.countLike = user.like;

        },
        // update post  
        UpdatePost(){
            let URL = "http://localhost:5000/post/" + this.user_id;
            console.log(URL)
            if( this.isLogin){
                let user = {
                    username: this.getUsername,
                    content: this.content_post,
                    time: this.time_post,
                    like: this.countLike, 
                };
                axios
                .put(URL, user)
                .then(res => {
                location.href= "http://localhost:5000/"; 
            });

            }else{
                let user = {
                    username: this.getUsername,
                    content: this.content_post,
                    time: this.time_post,
                    like: this.like,
                };
                axios
                .put(URL, user)
                .then(res => {
                location.href= "http://localhost:5000/"; 
                });
            };
            this.content_post="";

        },
        // user like
        Like(user){
            this.username_post = user.user;
            this.time_post = user.time;
            this.content_post = user.content;
            this.countLike =user.like+1;
            this.user_id=user.id;
            this.isLike = true;
            this.UpdatePost();
        }
    },
   
})

