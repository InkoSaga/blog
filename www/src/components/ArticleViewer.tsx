import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import { renderToString } from 'react-dom/server';
import { background } from '../Theme';
import {
    Theme, withStyles, WithStyles,
    Grid,
    Paper,
    Divider
} from '@material-ui/core';

//import Editor from './Editor';
import prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism-okaidia.css';

const marked = require('marked');

import axios from 'axios';

marked.Lexer.prototype.lex = function lex(src) {
    src = src.replace(/\r\n|\r/g, '\n').replace(/\t/g, '    ').replace(/\u2424/g, '\n');
    return this.token(src, true);
};

const renderer = new marked.Renderer();

renderer.heading = function (text, level) {
    // Small title. No need for an anchor.
    // It's reducing the risk of duplicated id and it's less elements in the DOM.
    if (level >= 4) {
        return "<h".concat(level, ">").concat(text, "</h").concat(level, ">");
    }

    var escapedText = text.toLowerCase().replace(/=&gt;|&lt;| \/&gt;|<code>|<\/code>/g, '').replace(/[^\u4e00-\u9fa5_a-zA-Z0-9]+/g, '-');
    return "\n    <h".concat(level, ">\n      <a class=\"anchor-link\" id=\"").concat(escapedText, "\"></a>").concat(text) + "<a class=\"anchor-link-style\" href=\"#".concat(escapedText, "\">\n        <svg viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M46.9 13.9c-.5-.6-1.2-.94-2.07-.94h-6.67l1.86-8.98c.17-.85 0-1.7-.52-2.3-.48-.6-1.2-.94-2.07-.94-1.6 0-3.2 1.27-3.54 2.93l-.5 2.42c0 .07-.07.13-.07.2l-1.37 6.62H20.7l1.88-8.96c.16-.85 0-1.7-.53-2.3-.48-.6-1.2-.94-2.07-.94-1.65 0-3.2 1.27-3.56 2.93l-.52 2.58v.08l-1.37 6.64H7.3c-1.67 0-3.22 1.3-3.58 2.96-.16.86 0 1.7.52 2.3.48.6 1.2.93 2.07.93h6.97l-2 9.65H4c-1.67 0-3.22 1.27-3.56 2.94-.2.8 0 1.67.5 2.27.5.6 1.2.93 2.08.93H10l-1.84 9.05c-.2.84 0 1.67.52 2.3.5.6 1.25.92 2.08.92 1.66 0 3.2-1.3 3.55-2.94l1.94-9.33h11.22l-1.87 9.05c-.15.84.03 1.67.53 2.3.5.6 1.2.92 2.07.92 1.65 0 3.22-1.3 3.56-2.94l1.9-9.33h7c1.6 0 3.2-1.28 3.53-2.93.2-.87 0-1.7-.52-2.3-.48-.62-1.2-.96-2.05-.96h-6.7l2.02-9.65h6.93c1.67 0 3.22-1.27 3.56-2.92.2-.85 0-1.7-.5-2.3l-.04.03zM17.53 28.77l1.95-9.65H30.7l-1.97 9.66H17.5h.03z\"/></svg>\n      </a></h").concat(level, ">\n  ");
};

//renderer.code = function (code: string, language: string, isEscaped: boolean) {
//    console.log(code);
//    //const test = renderToString(<Editor value={code} language={language} onChange={console.log} />);
//    console.log(language);
//    return `<div class='MarkdownEditor' lang='${language}'>${code}</div>`;
//}

marked.setOptions({
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight(code, lang) {
        let language;
        switch (lang) {
            case 'typescript':
                language = prism.languages.typescript;
                break;

            case 'javascript':
            default:
                language = prism.languages.javascript;
                break;
        }

        return prism.highlight(code, language);
    },
    renderer: renderer
});

const styles = (theme: Theme) => ({
    root: {
        fontFamily: theme.typography.fontFamily,
        fontSize: 16,
        color: theme.palette.text.primary,
        '& .anchor-link': {
            marginTop: -96,
            // Offset for the anchor.
            position: 'absolute'
        },
        '& pre, & pre[class*="language-"]': {
            margin: '24px 0',
            padding: '12px 18px',
            backgroundColor: 'rgba(0,0,0,0.4)',//theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch' // iOS momentum scrolling.

        },
        '& code': {
            display: 'inline-block',
            lineHeight: 1.6,
            fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
            padding: '3px 6px',
            color: theme.palette.text.primary,
            backgroundColor: 'rgba(0,0,0,0.4)',//theme.palette.background.paper,
            width: '100%',
            fontSize: 14
        },
        '& p code, & ul code, & pre code': {
            fontSize: 14,
            lineHeight: 1.6
        },
        '& h1': {
            ...theme.typography.display2,
            color: theme.palette.text.secondary,
            margin: '32px 0 16px'
        },
        '& .description': {
            ...theme.typography.headline,
            margin: '0 0 40px'
        },
        '& h2': {
            ...theme.typography.display1,
            color: theme.palette.text.secondary,
            margin: '32px 0 24px'
        },
        '& h3': {
            ...theme.typography.headline,
            color: theme.palette.text.secondary,
            margin: '32px 0 24px'
        },
        '& h4': {
            ...theme.typography.title,
            color: theme.palette.text.secondary,
            margin: '24px 0 16px'
        },
        '& p, & ul, & ol': {
            lineHeight: 1.6
        },
        '& h1, & h2, & h3, & h4': {
            '& code': {
                fontSize: 'inherit',
                lineHeight: 'inherit',
                // Remove scroll on small screens.
                wordBreak: 'break-word'
            },
            '& .anchor-link-style': {
                opacity: 0,
                // To prevent the link to get the focus.
                display: 'none'
            },
            '&:hover .anchor-link-style': {
                display: 'inline-block',
                opacity: 1,
                padding: '0 8px',
                color: theme.palette.text.hint,
                '&:hover': {
                    color: theme.palette.text.secondary
                },
                '& svg': {
                    width: '0.55em',
                    height: '0.55em',
                    fill: 'currentColor'
                }
            }
        },
        '& table': {
            width: '100%',
            display: 'block',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            // iOS momentum scrolling.
            borderCollapse: 'collapse',
            borderSpacing: 0,
            overflow: 'hidden',
            '& .prop-name': {
                fontSize: 13,
                fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace'
            },
            '& .required': {
                color: theme.palette.type === 'light' ? '#006500' : '#9bc89b'
            },
            '& .prop-type': {
                fontSize: 13,
                fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
                color: theme.palette.type === 'light' ? '#932981' : '#dbb0d0'
            },
            '& .prop-default': {
                fontSize: 13,
                fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
                borderBottom: "1px dotted ".concat(theme.palette.text.hint)
            }
        },
        '& thead': {
            fontSize: 14,
            fontWeight: theme.typography.fontWeightMedium,
            color: theme.palette.text.secondary
        },
        '& tbody': {
            fontSize: 14,
            lineHeight: 1.5,
            color: theme.palette.text.primary
        },
        '& td': {
            borderBottom: "1px solid ".concat(theme.palette.divider),
            padding: '8px 16px 8px 8px',
            textAlign: 'left'
        },
        '& td:last-child': {
            paddingRight: 24
        },
        '& td compact': {
            paddingRight: 24
        },
        '& td code': {
            fontSize: 13,
            lineHeight: 1.6
        },
        '& th': {
            whiteSpace: 'pre',
            borderBottom: "1px solid ".concat(theme.palette.divider),
            fontWeight: theme.typography.fontWeightMedium,
            padding: '0 16px 0 8px',
            textAlign: 'left'
        },
        '& th:last-child': {
            paddingRight: 24
        },
        '& tr': {
            height: 48
        },
        '& thead tr': {
            height: 64
        },
        '& strong': {
            fontWeight: theme.typography.fontWeightMedium
        },
        '& blockquote': {
            //borderLeft: "5px solid ".concat(theme.palette.text.hint),
            backgroundColor: 'rgba(0,0,0,0.4)',//theme.palette.background.paper,
            padding: '4px 24px',
            margin: '24px 0'
        },
        '& a, & a code': {
            // Style taken from the Link component
            color: theme.palette.secondary.main,
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline'
            }
        },
        '& img': {
            maxWidth: '100%'
        }
    },
    paper: {
        padding: theme.spacing.unit * 2,
        overflow: 'hidden',
        background: background.acrylic40,
        '&:hover': {
            background: background.acrylic60,
            transition: 'background-image 0.1s ease-in-out'
        }
    },
    comment: {
        background: 'rgba(255,255,255,0.4)'
    }
});

export interface ArticleViewerProps extends React.HTMLAttributes<HTMLDivElement> { }

export class ArticleViewer extends React.Component<WithStyles<keyof ReturnType<typeof styles>> & ArticleViewerProps> {

    state = {
        source: ''
    };

    commentContainer: React.RefObject<HTMLDivElement> = React.createRef()

    initUtterance = () => {
        document.head.insertAdjacentHTML(
            'beforeend',
            '<link rel="prefetch" href="https://utteranc.es/client.js" />'
        );
        document.head.insertAdjacentHTML(
            'beforeend',
            '<link rel="preload" href="https://utteranc.es/client.js" as="script" />'
        );
        const script = document.createElement('script');
        script.src = 'https://utteranc.es/client.js';
        script.async = true;
        script.setAttribute('repo', 'inkosaga/inkosaga.github.io');
        script.setAttribute('issue-term', (this.props as any).match.params.name);
        this.commentContainer.current!.appendChild(script);
    }

    componentDidMount() {
        this.initUtterance();
        axios.get(`${window.location.protocol}//${window.location.host}/articles/${(this.props as any).match.params.name}.md`, { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' } })
            .then(result => this.setState({ source: result.data }))
            .catch(console.warn);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.source !== '' && prevState.source === '') {
            //const domNodes = (ReactDOM.findDOMNode(this) as HTMLDivElement).getElementsByClassName('MarkdownEditor');
            //for(let i=0; i<domNodes.length; i++) {
            //    const domNode = domNodes[i];
            //    ReactDOM.render(<div style={{height:'30vh', background:'rgba(0,0,0,0.4)'}}><Editor readOnly value={domNode.innerHTML} language={domNode.getAttribute('lang') as string} onChange={console.log} /></div>, domNode);
            //}
            if (location.hash) {
                const requested_hash = location.hash.slice(1);
                location.hash = '';
                location.hash = requested_hash;
            }
        }
    }

    render() {
        return (
            <Grid container spacing={32} justify='center' alignItems='center'>
                <Grid item xs={12}>
                    <Paper square className={this.props.classes.paper}>
                        <div className={this.props.classes.root} dangerouslySetInnerHTML={{ __html: marked(this.state.source) }} />
                        <Divider />
                        <div ref={this.commentContainer} />
                    </Paper>
                </Grid>
            </Grid >

        );
    }
}

export default withStyles(styles as any, { withTheme: true })(ArticleViewer);
