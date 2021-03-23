import React from 'react';
import ReactMarkdown from 'react-markdown';
import ReactMarkdownHtml from 'react-markdown/with-html';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import gfm from 'remark-gfm';
import toc from 'remark-toc';
import remarkSlug from 'remark-slug';

interface Props {
  className?: string;
  children: string;
}
type UseMarkdown = (style: Record<string, string>, allowDangerousHtml: boolean) => React.FC<Props>;

/**
 * This hook provides a Markdown renderer to use in your page.
 * Syntax highlighting from react-syntax-highlighter.
 * Additional plugins:
 *  - [remark-gfm](https://github.com/remarkjs/remark-gfm)
 *  - [remark-toc](https://github.com/remarkjs/remark-toc)
 *  - [remark-slug](https://github.com/remarkjs/remark-slug)
 * General styling is provided by [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography).
 *  The `prose` class is applied by default. Use the prose modifier classes to adjust the styling.
 * Use grey-matter to get the frontmatter and the content from a markdown file, then pass
 *  the content as the child of the Markdown component.
 *
 * example:
 * ```js
 * import React from 'react';
 * import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
 * import { useMarkdown } from 'hooks/useMarkdown';
 *
 * export const Component = () => {
 *   const Markdown = useMarkdown(dark);
 *   const markdown = `
 * # Title
 *
 * Hello there!
 * `;
 *
 *   return <Markdown>{markdown}</Markdown>;
 * };
 * ```
 *
 * @param style The style from react-syntax-highlighter to apply to the code in the markdown.
 * @param allowDangerousHtml Whether to allow dangerous HTML in your markdown.
 * @returns Markdown component.
 */
export const useMarkdown: UseMarkdown = (style, allowDangerousHtml = false) => {
  const renderers = {
    code: ({ language, value }) => (
      <SyntaxHighlighter language={language} style={style}>
        {value}
      </SyntaxHighlighter>
    ),
  };

  const plugins = [
    gfm,
    remarkSlug,
    toc,
  ];

  if (allowDangerousHtml) {
    return ({ children, className }) => (
      <ReactMarkdownHtml className={`prose ${className}`} plugins={plugins} renderers={renderers} allowDangerousHtml>
        {children}
      </ReactMarkdownHtml>
    );
  }

  return ({ children, className }) => (
    <ReactMarkdown className={`prose ${className}`} plugins={plugins} renderers={renderers}>
      {children}
    </ReactMarkdown>
  );
};

