const { DateTime } = require('luxon');
const Image = require('@11ty/eleventy-img');
const path = require('path');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const slugify = require('slugify');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
  // Add syntax highlighting plugin
  eleventyConfig.addPlugin(syntaxHighlight);

  // Configure enhanced markdown
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: 'after',
      class: 'header-anchor',
      symbol: '#',
      level: [1, 2, 3, 4]
    }),
    slugify: (str) => slugify(str, { lower: true, strict: true })
  });

  eleventyConfig.setLibrary('md', markdownLibrary);

  // Date filter
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('dd LLL yyyy');
  });

  // Blog post navigation filters
  eleventyConfig.addFilter("getPreviousCollectionItem", function(collection, page) {
    if (!collection || !page) return null;
    const index = collection.findIndex(item => item.inputPath === page.inputPath);
    return index > 0 ? collection[index - 1] : null;
  });

  eleventyConfig.addFilter("getNextCollectionItem", function(collection, page) {
    if (!collection || !page) return null;
    const index = collection.findIndex(item => item.inputPath === page.inputPath);
    return index < collection.length - 1 ? collection[index + 1] : null;
  });

  // Image optimization shortcode
  eleventyConfig.addAsyncShortcode('image', async function (src, alt, sizes = '100vw') {
    if (alt === undefined) {
      throw new Error(`Missing \`alt\` on image from: ${src}`);
    }

    if (src.startsWith('http://') || src.startsWith('https://')) {
      return `<img src="${src}" alt="${alt}" loading="lazy" decoding="async" />`;
    }

    let metadata = await Image(src, {
      widths: [320, 640, 960, 1200],
      formats: ['avif', 'webp', 'jpeg'],
      urlPath: '/assets/images/',
      outputDir: './_site/assets/images/',
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);
        return `${name}-${width}w.${format}`;
      }
    });

    let imageAttributes = {
      alt,
      sizes,
      loading: 'lazy',
      decoding: 'async'
    };

    return Image.generateHTML(metadata, imageAttributes);
  });

  // Static file passthrough
  eleventyConfig.addPassthroughCopy('src/assets/images');
  eleventyConfig.addPassthroughCopy('src/assets/css');
  eleventyConfig.addPassthroughCopy('src/assets/js');
  eleventyConfig.addPassthroughCopy('src/robots.txt');
  eleventyConfig.addPassthroughCopy('src/favicon.ico');  

  // Add collections
  eleventyConfig.addCollection('posts', function (collection) {
    return collection.getFilteredByGlob('src/blog/posts/*.md')
      .filter(post => !post.data.draft)
      .reverse();
  });
  
  eleventyConfig.addCollection('tagList', function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach((item) => {
      (item.data.tags || []).forEach((tag) => {
        if (!['all', 'nav', 'post', 'posts', 'draft'].includes(tag)) {
          tagSet.add(tag);
        }
      });
    });
    return Array.from(tagSet).sort();
  });

  // Add shortcodes
  eleventyConfig.addPairedShortcode('callout', function (content, type = 'info') {
    const styles = {
      info: 'background: #e6f3ff; border-left: 4px solid #0066cc; color: #003d7a;',
      warning: 'background: #fff3cd; border-left: 4px solid #ffc107; color: #856404;',
      success: 'background: #d1eddd; border-left: 4px solid #28a745; color: #155724;',
      error: 'background: #f8d7da; border-left: 4px solid #dc3545; color: #721c24;'
    };
    
    return `<div class="callout callout--${type}" style="${styles[type] || styles.info} padding: 1rem; margin: 1rem 0;" role="note">
      <div class="callout__content">${content}</div>
    </div>`;
  });

  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);

  eleventyConfig.addShortcode('buildTime', () => `${new Date().toISOString()}`);

  // Production optimizations
  if (process.env.NODE_ENV === 'production') {
    const htmlmin = require('html-minifier');
    eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
      if (outputPath && outputPath.endsWith('.html')) {
        return htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true
        });
      }
      return content;
    });
  }

  return {
    templateFormats: ['md', 'njk', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: '_site'
    }
  };
};