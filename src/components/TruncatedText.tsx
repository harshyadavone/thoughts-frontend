import React from "react";

interface TruncatedTextProps {
  text: string;
  maxLength: number;
  dangerous?:boolean;
}

const TruncatedText: React.FC<TruncatedTextProps> = ({ text, maxLength, dangerous }) => {
  const truncatedText = text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return dangerous ? <div dangerouslySetInnerHTML={{__html: truncatedText}}  /> : <span className="font-other tracking-wide">{truncatedText}</span>;
};

export default TruncatedText;