import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  posts:Post[]=[];
  page:number;
  pageSize:number;
  collectionSize:number;
  misposts: Post[];
 
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe((data: any)=>{
      this.posts = data;
      console.log(this.posts);
      this.page = 1;
      this.pageSize = 4;
      this.collectionSize = this.posts.length;
      this.refreshposts();
      
  })

}
deletePost(id){
  this.postService.delete(id).subscribe(res => {
       this.posts = this.posts.filter(item => item.id !== id);
       console.log('Post deleted successfully!');
       this.refreshposts();
  })
}
refreshposts() {
  this.misposts = this.posts
    .map((post_temporal, i) => ({id: i + 1, ...post_temporal}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
}
}
