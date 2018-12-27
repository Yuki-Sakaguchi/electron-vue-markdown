<template>
  <div class="contents">
    <editor-menu-bar :editor="editor">
      <div slot-scope="{ commands, isActive }"></div>
    </editor-menu-bar>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'

export default {
  components: {
    EditorMenuBar,
    EditorContent,
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new BulletList(),
          new OrderedList(),
          new ListItem(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        content: `
          <h1>Vueでリッチテキストを作ってみる</h1>
          <p>vueのtiptapというライブラリを使っています</p>
          <pre><code>var example = 'example';</code></pre>
          <h2>これはH2です</h2>
          <p>
            sample sample sample sample sample sample sample sample sample
            sample sample sample sample sample sample sample sample sample
            sample sample sample sample sample sample sample sample sample
          </p>
          <h2>これはH2です</h2>
          <ul>
            <li>list</li>
            <li>list</li>
            <li>list</li>
            <li>list</li>
          </ul>
          <p>
            sample sample sample sample sample sample sample sample sample
            sample sample sample sample sample sample sample sample sample
            sample sample sample sample sample sample sample sample sample
          </p>
        `,
      }),
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style lang="scss">
.contents {
  width: calc(100% - 300px);
  height: 100%;
  overflow-y: scroll;
}

.ProseMirror {
  padding: 30px;
  outline: none;
  &:focus {
    outline: none;
  }
  > * {
    margin-bottom: 20px;
    &:first-child {
      margin-top: 0 !important;
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 50px;
    font-size: 2rem;
    font-weight: bold;
  }
  p {
    line-height: 1.6;
  }
  pre {
    padding: 15px;
    color: white;
    background-color: #3a3a3e;
    border-radius: 3px;
    line-height: 1.2;
    code {
      font-family: 'Source Code Pro', monospace;
    }
  }
}
</style>
