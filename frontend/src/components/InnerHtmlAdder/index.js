import dompurify from "dompurify";

// NOTE: InnerHTML sanitization is needed to prevent XSS attacks.
export default function InnerHtmlAdder({innerHtml}) {
    const sanitizer = dompurify.sanitize;
    return (
        <div dangerouslySetInnerHTML={{__html: sanitizer(innerHtml)}}/>
    )
}