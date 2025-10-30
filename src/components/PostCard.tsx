import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageSquare, Share2, MoreHorizontal } from "lucide-react";

interface PostCardProps {
  author: {
    name: string;
    title: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  image?: string;
}

const PostCard = ({ author, content, timestamp, likes, comments, image }: PostCardProps) => {
  return (
    <Card className="shadow-soft hover:shadow-glow transition-smooth">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={author.avatar} />
              <AvatarFallback>{author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{author.name}</h3>
              <p className="text-sm text-muted-foreground">{author.title}</p>
              <p className="text-xs text-muted-foreground">{timestamp}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-foreground whitespace-pre-wrap">{content}</p>
        {image && (
          <img 
            src={image} 
            alt="Post content" 
            className="mt-4 rounded-lg w-full object-cover"
          />
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col gap-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground w-full">
          <span>{likes} likes</span>
          <span>{comments} comments</span>
        </div>
        
        <div className="flex items-center gap-2 w-full border-t pt-3">
          <Button variant="ghost" className="flex-1">
            <ThumbsUp className="h-4 w-4 mr-2" />
            Like
          </Button>
          <Button variant="ghost" className="flex-1">
            <MessageSquare className="h-4 w-4 mr-2" />
            Comment
          </Button>
          <Button variant="ghost" className="flex-1">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
