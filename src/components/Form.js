import React, {useContext} from 'react';
import {Transition} from '@headlessui/react';
import AppContext from '../AppContext';
import Avatar from './Avatar';
import {useEditor, EditorContent} from '@tiptap/react';
import {getEditorConfig} from '../utils/editor';

const Form = (props) => {
    const {member, postId, dispatchAction, onAction} = useContext(AppContext);

    const editorAddConfig = {
        placeholder: 'Join the discussion',
        autofocus: false
    };

    const editorReplyConfig = {
        placeholder: 'Reply to comment',
        autofocus: false
    };

    const editor = useEditor({
        ...getEditorConfig(props.isReply ? editorReplyConfig : editorAddConfig)
    });

    const focused = editor?.isFocused || !editor?.isEmpty;

    const submitForm = async (event) => {
        event.preventDefault();

        if (editor.isEmpty) {
            return;
        }

        if (props.isReply) {
            try {
                // Send comment to server
                await dispatchAction('addReply', {
                    parent: props.parent,
                    reply: {
                        post_id: postId,
                        status: 'published',
                        html: editor.getHTML()
                    }
                });
    
                // Clear message and blur on success
                editor.chain().clearContent().blur().run();
                props.toggle();
            } catch (e) {
                // eslint-disable-next-line no-console
                console.error(e);
            }
        } else {
            try {
                // Send comment to server
                await onAction('addComment', {
                    post_id: postId,
                    status: 'published',
                    html: editor.getHTML()
                });

                // Clear message and blur on success
                editor.chain().clearContent().blur().run();
            } catch (e) {
                // eslint-disable-next-line no-console
                console.error(e);
            }
        }
    };

    const focusEditor = (event) => {
        editor.commands.focus();
    };

    return (
        <form onClick={focusEditor} className={`bg-white comment-form transition duration-200 rounded-md px-3 pt-3 pb-2 ${props.commentsCount && '-ml-[13px] -mr-3'} mt-8 mb-10 shadow-lg dark:bg-[rgba(255,255,255,0.08)] dark:shadow-transparent hover:shadow-xl ${focused ? 'cursor-default' : 'cursor-pointer'}`}>
            <div className="w-full relative">
                <div className="pr-3 font-sans leading-normal dark:text-neutral-300">
                    <div className="relative w-full">
                        <EditorContent
                            className={`transition-[min-height] pl-[56px] px-0 py-[14px] ${focused ? 'pt-[48px] pb-[68px]' : 'mb-1'} duration-150 bg-transparent w-full placeholder:text-neutral-300 dark:placeholder:text-[rgba(255,255,255,0.3)] border-none resize-none rounded-md border border-slate-50 font-sans text-[16.5px] leading-normal focus:outline-0 dark:border-none dark:text-neutral-300 ${focused ? 'cursor-text min-h-[144px]' : 'cursor-pointer overflow-hidden min-h-[56px] hover:border-slate-300'}`}
                            editor={editor} 
                        />
                        <button
                            className={`transition-[opacity] duration-150 absolute -right-[9px] bottom-[4px] rounded-[4px] border py-3 px-4 font-sans text-sm text-center bg-neutral-900 font-semibold text-white dark:bg-[rgba(255,255,255,0.9)] dark:text-neutral-800`}
                            type="button"
                            onClick={submitForm}
                        >
                            Add {props.isReply ? 'reply' : 'comment'} 
                        </button>
                    </div>
                </div>
                <div className="flex mb-1 justify-start items-center absolute top-[4px] left-0">
                    <Avatar saturation={props.avatarSaturation} />
                    <Transition
                        show={focused}
                        enter="transition duration-500 ease-in-out"
                        enterFrom="opacity-0 -translate-x-2"
                        enterTo="opacity-100 translate-x-0"
                        leave="transition-none duration-0"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="ml-3">
                            <h4 className="text-lg font-sans font-semibold mb-1 tracking-tight dark:text-neutral-300">{member.name ? member.name : 'Anonymous'}</h4>
                        </div>
                    </Transition>
                </div>
            </div>
        </form>
    );
};
  
export default Form;