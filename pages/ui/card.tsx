import React from 'react';
import Avatar from './avatar';


export interface BlogPost {
  title: string, 
  description: string, 
  createdAt: string, 
  id: string,
  authors: Array<{createdAt: string, name:string, avatar: string, updatedAt: string, id: string, postId: string}>,
  comments: Array<{createdAt: string, description: string, id: string, postId: string, title: string, updatedAt: string}>
}

type Props = {
  blogPost: BlogPost,
  isFirst: boolean
}

export const Card: React.FC<Props> = ({ blogPost, isFirst }) => {
  const { title, description, createdAt, authors, comments } = blogPost
  const [fullCommentIds, setFullCommentIds] = React.useState<string[]>([]);

  const onReadMoreClick = React.useCallback((id) => {
    setFullCommentIds([...fullCommentIds, id]);
  }, [fullCommentIds]);

  return (
    <div className={`border-b border-gray-200 ${isFirst ? "col-span-2 py-12 px-28 bg-gray-50 m-0" : "py-8 mx-28"}`}>
        <div>
            <h3 className={`mb-1 ${isFirst ? "text-4xl" : "text-2xl"}`}>{title}</h3>
            <p className="text-xs mb-2">{new Date(createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</p> 
            <p className="mb-4 text-gray-600">{description}</p>
        </div>
        <div className="flex flex-column mb-2">
            {authors.map(author => (<Avatar key={author.id} avatar={author.avatar} name={author.name}/>))}
        </div>
        <div className="w-2/3">
            <p className="text-sm">Comments ({comments.length})</p>
            {comments.map(comment => (
                <div key={comment.id} className="flex flex-column mt-2">
                    <p className={`text-gray-600 text-sm ${fullCommentIds.includes(comment.id) ? "" : "truncate"}`}>{comment.description}</p>
                    {fullCommentIds.includes(comment.id) ? "" : <button className="text-xs whitespace-nowrap flex items-center" onClick={() => onReadMoreClick(comment.id)}>Read More</button>}
                </div>
            ))}
        </div>
    </div>
  )
}
