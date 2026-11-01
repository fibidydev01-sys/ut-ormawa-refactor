<template>
  <div class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
    <div class="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2">
      <button
        type="button"
        class="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
        :class="{ 'bg-emerald-100 text-emerald-700 border-emerald-300': isActive('bold') }"
        @click="toggleBold"
      >
        Bold
      </button>
      <button
        type="button"
        class="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
        :class="{ 'bg-emerald-100 text-emerald-700 border-emerald-300': isActive('italic') }"
        @click="toggleItalic"
      >
        Italic
      </button>
      <button
        type="button"
        class="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
        :class="{ 'bg-emerald-100 text-emerald-700 border-emerald-300': isActive('heading', { level: 2 }) }"
        @click="toggleHeading"
      >
        Heading 2
      </button>
      <button
        type="button"
        class="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
        :class="{ 'bg-emerald-100 text-emerald-700 border-emerald-300': isActive('bulletList') }"
        @click="toggleBulletList"
      >
        Bullet List
      </button>
      <button
        type="button"
        class="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
        :class="{ 'bg-emerald-100 text-emerald-700 border-emerald-300': isActive('orderedList') }"
        @click="toggleOrderedList"
      >
        Ordered List
      </button>
    </div>

    <EditorContent
      v-if="editor"
      :editor="editor"
      class="min-h-[260px] bg-white px-4 py-3 text-sm text-slate-700"
    />
    <div
      v-else
      class="min-h-[260px] flex items-center justify-center text-slate-400 text-sm"
    >
      Memuat editor...
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

interface Props {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Mulai menulis konten artikel...',
  disabled: false,
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

// useEditor harus dipanggil di level setup (bukan di dalam onMounted)
// agar Tiptap bisa mendaftarkan lifecycle hooks dengan benar di Vue
const editor = useEditor({
  content: props.modelValue || '',
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [2],
      },
    }),
  ],
  editorProps: {
    attributes: {
      class: 'prose prose-sm max-w-none min-h-[220px] focus:outline-none cursor-text',
    },
  },
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
})

function isActive(name: string, attrs?: Record<string, unknown>) {
  if (!editor.value || typeof editor.value.isActive !== 'function') return false
  return editor.value.isActive(name, attrs)
}

watch(
  () => props.modelValue,
  (value) => {
    if (!editor.value) return
    const currentValue = editor.value.getHTML()
    if (value !== currentValue) {
      editor.value.commands.setContent(value || '', false)
    }
  }
)

watch(
  () => props.disabled,
  (value) => {
    if (!editor.value) return
    editor.value.setEditable(!value)
  },
  { immediate: true }
)

function toggleBold() {
  editor.value?.chain().focus().toggleBold().run()
}

function toggleItalic() {
  editor.value?.chain().focus().toggleItalic().run()
}

function toggleHeading() {
  editor.value?.chain().focus().toggleHeading({ level: 2 }).run()
}

function toggleBulletList() {
  editor.value?.chain().focus().toggleBulletList().run()
}

function toggleOrderedList() {
  editor.value?.chain().focus().toggleOrderedList().run()
}

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style>
.tiptap p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #94a3b8;
  pointer-events: none;
  height: 0;
}
</style>
