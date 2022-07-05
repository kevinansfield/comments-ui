import Avatar from './Avatar';

function Comment(props) {
    const comment = props.comment;

    return (
        <div className="flex mb-4">
            <div className="mr-4">
                <Avatar />
            </div>
            <div className="mt-[2px]">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-sans font-semibold mb-1">{comment.member.name}</h4>
                    {/* <h6 className="text-sm text-neutral-400 font-sans">{comment.member.bio}</h6> */}
                    <div className="text-sm text-neutral-400 font-sans font-normal">
                        2 minutes ago
                    </div>
                </div>
                <div className="mb-4 font-sans leading-normal">
                    <p>{comment.html}</p>
                </div>
            </div>
        </div>
    );
}
  
export default Comment;
