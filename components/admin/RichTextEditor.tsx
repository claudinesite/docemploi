'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  Quote,
  Undo,
  Redo,
  Heading2,
  Heading3
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

const editorStyles = `
  .ProseMirror {
    outline: none;
  }
  .ProseMirror p { margin-bottom: 0.5rem; }
  .ProseMirror ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 0.5rem; }
  .ProseMirror ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 0.5rem; }
  .ProseMirror h2 { font-size: 1.5rem; font-weight: 700; margin-top: 1rem; margin-bottom: 0.5rem; }
  .ProseMirror h3 { font-size: 1.25rem; font-weight: 700; margin-top: 1rem; margin-bottom: 0.5rem; }
  .ProseMirror blockquote { border-left: 4px solid #e2e8f0; padding-left: 1rem; font-style: italic; }
  .ProseMirror a { color: #124EA6; text-decoration: underline; cursor: pointer; }
`

interface EditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: EditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer',
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Décrivez le poste, les missions et le profil recherché...',
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[250px] p-4 text-slate-800 font-medium',
      },
    },
  })

  // Synchronize on external changes (e.g. initial load)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  if (!editor) return null

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#124EA6]/10 focus-within:border-[#124EA6] transition-all bg-white">
      <style>{editorStyles}</style>
      {/* TOOLBAR */}
      <div className="bg-slate-50 border-b border-slate-200 p-1 flex items-center flex-wrap gap-1">
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
          active={editor.isActive('heading', { level: 2 })}
          title="Titre 2"
        >
          <Heading2 size={18} />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} 
          active={editor.isActive('heading', { level: 3 })}
          title="Titre 3"
        >
          <Heading3 size={18} />
        </ToolbarButton>

        <div className="w-px h-6 bg-slate-200 mx-1" />

        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleBold().run()} 
          active={editor.isActive('bold')}
          title="Gras"
        >
          <Bold size={18} />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleItalic().run()} 
          active={editor.isActive('italic')}
          title="Italique"
        >
          <Italic size={18} />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleUnderline().run()} 
          active={editor.isActive('underline')}
          title="Souligné"
        >
          <UnderlineIcon size={18} />
        </ToolbarButton>

        <div className="w-px h-6 bg-slate-200 mx-1" />

        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleBulletList().run()} 
          active={editor.isActive('bulletList')}
          title="Liste à puces"
        >
          <List size={18} />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleOrderedList().run()} 
          active={editor.isActive('orderedList')}
          title="Liste ordonnée"
        >
          <ListOrdered size={18} />
        </ToolbarButton>

        <div className="w-px h-6 bg-slate-200 mx-1" />

        <ToolbarButton 
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Annuler"
        >
          <Undo size={18} />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Rétablir"
        >
          <Redo size={18} />
        </ToolbarButton>
      </div>

      {/* EDITOR */}
      <EditorContent editor={editor} />
      
      <div className="bg-slate-50/50 px-4 py-2 border-t border-slate-100 flex justify-between items-center">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            {editor.storage.characterCount?.characters?.() || 0} caractères
        </span>
        <span className="text-[10px] text-[#124EA6] font-bold uppercase tracking-widest opacity-40">
            Éditeur Pro v1.0
        </span>
      </div>
    </div>
  )
}

function ToolbarButton({ onClick, active, disabled, children, title }: any) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        w-9 h-9 p-0 rounded-md transition-colors
        ${active ? 'bg-white shadow-sm text-[#124EA6]' : 'text-slate-500 hover:text-slate-900'}
        ${disabled ? 'opacity-30' : ''}
      `}
    >
      {children}
    </Button>
  )
}
