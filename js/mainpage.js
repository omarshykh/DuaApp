function newPost(){
    var parent=document.getElementById('maindiv');

    var newDiv=document.createElement('div');
    newDiv.setAttribute('id','writediv');

    var newLabel=document.createElement('label');
    newLabel.setAttribute('id','writehead');
    var newTxt=document.createTextNode("Write your post");
    newLabel.appendChild(newTxt);

    var box=document.createElement('textarea');
    box.setAttribute('rows','5');
    box.setAttribute('cols','45');
    box.setAttribute('id','commentbox');

    var postButton=document.createElement('button');
    postButton.setAttribute('id','postbutton');
    postButton.setAttribute('onclick','addNewPost()');
    var postTxt=document.createTextNode("Post");
    postButton.appendChild(postTxt);

    newDiv.appendChild(newLabel);
    newDiv.appendChild(document.createElement('br'));
    newDiv.appendChild(box);
    newDiv.appendChild(document.createElement('br'));
    newDiv.appendChild(postButton);

    parent.innerHTML="";
    parent.appendChild(newDiv);
    document.getElementById('newpost').innerHTML="View All Posts";
    document.getElementById('newpost').onclick=viewPosts;
}

function viewPosts(){
    var parent=document.getElementById('maindiv');

    var newDiv=document.createElement('div');
    newDiv.setAttribute('id','allpost');

    var posts=localStorage.getItem('posts');
    if(posts !==null){
        posts=JSON.parse(posts);
        //post lanay hain yahan sb....
        var meth;
        var user=localStorage.getItem('userLogin');
        user=JSON.parse(user);
        user=user.name;
        for(var i=0;i<posts.length;i++){
            meth="like('"+posts[i].name+"')";
            var postDiv=document.createElement('div');
            postDiv.setAttribute('class','postdiv');

            var head=document.createElement('h4');
            head.setAttribute('class','postby');
            var headTxt=document.createTextNode(posts[i].by);
            head.appendChild(headTxt);

            var dt=document.createElement('h6');
            dt.setAttribute('class','dt');
            var dtTxt=document.createTextNode(posts[i].date+" "+posts[i].time);
            dt.appendChild(dtTxt);

            var para=document.createElement('p');
            para.setAttribute('class','posts');
            var paraTxt=document.createTextNode(posts[i].content);
            para.appendChild(paraTxt);

            var anker=document.createElement('a');
            anker.setAttribute('href','javascript:void(0)');
            anker.setAttribute('class','likeclass');
            anker.setAttribute('id',posts[i].name);
            anker.setAttribute('onclick',meth);
            var ankerTxt=document.createTextNode("Like("+posts[i].likes+")");
            if(posts[i].likes>0){
                anker.style.color="blue";
            }
            anker.appendChild(ankerTxt);

            postDiv.appendChild(head);
            postDiv.appendChild(dt);
            if(posts[i].by===user){
                var metho="deletePost('"+posts[i].name+"')";
                var del=document.createElement('a');
                del.setAttribute('href','javascript:void(0)');
                del.setAttribute('class','delclass');
                del.setAttribute('onclick',metho);
                var delTxt=document.createTextNode("Delete Post");
                del.appendChild(delTxt);
                para.appendChild(del);
            }    
            postDiv.appendChild(para);
            postDiv.appendChild(anker);

            newDiv.appendChild(postDiv);
        }
        parent.innerHTML="";
        parent.appendChild(newDiv);
        document.getElementById('newpost').innerHTML="New Post";
        document.getElementById('newpost').onclick=newPost;
    }
    else{
        var head3=document.createElement('h3');
        var headTxt=document.createTextNode("No posts there to show.");
        head3.appendChild(headTxt);
        newDiv.appendChild(head3);
        parent.innerHTML="";
        parent.appendChild(newDiv);
        document.getElementById('newpost').innerHTML="New Post";
        document.getElementById('newpost').onclick=newPost;
    }
}

function addNewPost(){
    var content=document.getElementById('commentbox').value;
    if(content===""){
        alert("Please write some post then click Post button!!");
    }
    else{
        var date=wantDate();
        var time=wantTime();
        var posts=localStorage.getItem('posts');
        if(posts !==null){
            posts=JSON.parse(posts);
        }
        else{
            posts=[];
        }
        var user=localStorage.getItem('userLogin');
        user=JSON.parse(user);
        user=user.name;
    var post={
        content:content,
        likes:0,
        by:user,
        name:"post"+(posts.length+1),
        date:date,
        time:time
    };
    posts.push(post);
    posts=JSON.stringify(posts);
    localStorage.setItem('posts',posts);
    viewPosts();
    }
}

function wantDate(){
    var date = new Date();
    var dd=date.getDate();
    var mm=date.getMonth()+1;
    var yy=date.getFullYear();
    var total=dd+"/"+mm+"/"+yy;
    return total;
}

function wantTime(){
    var date = new Date();
    var standard;
    var hh=date.getHours();
    if(hh===0){
        hh=12;
        standard="am";
    }
    else if(hh<=12 && hh>0){
        standard="pm";
    }
    else if(hh>12 && hh<=23){
        standard="am";
        hh=hh-12;
    }
    var mm=date.getMinutes();
    var total=hh+":"+mm+" "+standard;
    return total;

}
function like(postid){
var posts=localStorage.getItem('posts');
posts=JSON.parse(posts);

for(var i=0;i<posts.length;i++){
    if(posts[i].name===postid){
        posts[i].likes=posts[i].likes+1;
        break;
    }
}
posts=JSON.stringify(posts);
localStorage.setItem('posts',posts);
viewPosts();
}

function deletePost(postid){
    var posts=localStorage.getItem('posts');
    posts=JSON.parse(posts);
    var index = posts.findIndex(function(o){
        return o.name===postid;
    });
    posts.splice(index,1);
    posts=JSON.stringify(posts);
    localStorage.setItem('posts',posts);
    viewPosts();
}