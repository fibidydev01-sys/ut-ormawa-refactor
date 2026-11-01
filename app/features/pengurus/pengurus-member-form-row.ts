// ============================================================
// MemberFormRow — satu baris form anggota pengurus
// File: app/features/pengurus/pengurus-member-form-row.ts
//
// Komponen render-function yang dulu ditulis inline di halaman
// admin-area/struktur-pengurus. Dipindah apa adanya (S5).
// Props: member, uploadKey, uploadingKey, compact
// Emits: upload(event), removePhoto()
// ============================================================

import { defineComponent, h } from 'vue'
import type { PengurusMember } from './pengurus.types'

export default defineComponent({
  name: 'MemberFormRow',
  props: {
    member: { type: Object as () => PengurusMember, required: true },
    uploadKey: { type: String, required: true },
    uploadingKey: { type: String, default: '' },
    compact: { type: Boolean, default: false },
  },
  emits: ['upload', 'removePhoto'],
  setup(props, { emit }) {
    return () => {
      const m = props.member
      const isUploading = props.uploadingKey === props.uploadKey

      return h('div', { class: 'flex items-start gap-3' }, [
        // Foto
        h('div', { class: 'relative shrink-0' }, [
          h(
            'div',
            {
              class: props.compact
                ? 'w-12 h-12 rounded-full bg-slate-100 overflow-hidden border-2 border-white shadow'
                : 'w-14 h-14 rounded-full bg-slate-100 overflow-hidden border-2 border-white shadow',
            },
            [
              m.photo
                ? h('img', { src: m.photo, class: 'w-full h-full object-cover' })
                : h(
                    'span',
                    { class: 'flex items-center justify-center h-full text-slate-300 text-xl' },
                    '👤',
                  ),
            ],
          ),
          h(
            'label',
            {
              for: `photo-${props.uploadKey}`,
              class:
                'absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center cursor-pointer shadow',
              title: 'Upload foto',
            },
            [
              h(
                'svg',
                {
                  class: 'w-2.5 h-2.5 text-white',
                  fill: 'none',
                  stroke: 'currentColor',
                  viewBox: '0 0 24 24',
                },
                [
                  h('path', {
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    'stroke-width': '2.5',
                    d: 'M12 4v16m8-8H4',
                  }),
                ],
              ),
            ],
          ),
          h('input', {
            id: `photo-${props.uploadKey}`,
            type: 'file',
            accept: 'image/*',
            class: 'hidden',
            onChange: (e: Event) => emit('upload', e),
          }),
          isUploading
            ? h(
                'div',
                {
                  class:
                    'absolute inset-0 bg-white/70 rounded-full flex items-center justify-center',
                },
                [
                  h(
                    'svg',
                    {
                      class: 'animate-spin w-4 h-4 text-emerald-500',
                      fill: 'none',
                      viewBox: '0 0 24 24',
                    },
                    [
                      h('circle', {
                        class: 'opacity-25',
                        cx: '12',
                        cy: '12',
                        r: '10',
                        stroke: 'currentColor',
                        'stroke-width': '4',
                      }),
                      h('path', {
                        class: 'opacity-75',
                        fill: 'currentColor',
                        d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z',
                      }),
                    ],
                  ),
                ],
              )
            : null,
        ]),
        // Fields
        h('div', { class: 'flex-1 space-y-2' }, [
          !props.compact
            ? h('div', {}, [
                h(
                  'label',
                  { class: 'block text-[10px] font-bold text-slate-500 uppercase mb-0.5' },
                  'Jabatan',
                ),
                h('input', {
                  value: m.jabatan,
                  onInput: (e: Event) => {
                    m.jabatan = (e.target as HTMLInputElement).value
                  },
                  type: 'text',
                  placeholder: 'cth: Koordinator',
                  class:
                    'w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white',
                }),
              ])
            : null,
          h('div', {}, [
            h(
              'label',
              { class: 'block text-[10px] font-bold text-slate-500 uppercase mb-0.5' },
              'Nama Lengkap',
            ),
            h('input', {
              value: m.name,
              onInput: (e: Event) => {
                m.name = (e.target as HTMLInputElement).value
              },
              type: 'text',
              placeholder: 'Nama lengkap',
              class:
                'w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white',
            }),
          ]),
          h('div', {}, [
            h(
              'label',
              { class: 'block text-[10px] font-bold text-slate-500 uppercase mb-0.5' },
              'NIM',
            ),
            h('input', {
              value: m.nim,
              onInput: (e: Event) => {
                m.nim = (e.target as HTMLInputElement).value
              },
              type: 'text',
              placeholder: 'NIM mahasiswa',
              class:
                'w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white',
            }),
          ]),
          m.photo
            ? h(
                'button',
                {
                  onClick: () => emit('removePhoto'),
                  class: 'text-[10px] text-red-400 hover:text-red-600 transition-colors',
                },
                'Hapus foto',
              )
            : null,
        ]),
      ])
    }
  },
})
