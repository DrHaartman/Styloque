import {format} from 'date-fns';

function Post({ title, summary, content, coverImagePath, createdAt, author }) {
    return (
        <div className="grid grid-cols-2 gap-4 p-2.5 mx-2 my-4 rounded-lg">
            <div className='w-40%'>
                <img className="w-full h-full rounded" src={ 'http://localhost:5000/' + coverImagePath.replace(/\\/g, '/')} alt={title} />
            </div>
            <div className="p-2.5">
                <h2 className='text-lg font-bold m-0 leading-tight'>{title}</h2>
                <p className='m-2 flex gap-[5px] font-bold text-grey-100 text-sm'>
                    <a className='text-grey' href="">{author?.username}</a>
                    <time>{format(new Date(createdAt), "MMM d, yyyy  HH:mm")}</time>
                </p>
                <p className='text-sm m-2 leading-normal'>{summary}</p>
            </div>
        </div>
    );
}

export default Post;
