import React, { TextareaHTMLAttributes } from 'react';
import { BaseColorMap } from '../../base/colors';
import { MarginMixin, PaddingMixin } from '../../base/spacing';
export declare const textareaVariants: {
    normal: string;
    outline: string;
};
export declare const textareaSizes: {
    lg: string;
    md: string;
    sm: string;
};
export declare const textareaBorderSizes: {
    lg: string;
    md: string;
    sm: string;
};
export declare const textareaColors: BaseColorMap & {
    white: string;
};
export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>, PaddingMixin, MarginMixin {
    color?: keyof typeof textareaColors;
    size?: keyof typeof textareaSizes | number;
    borderSize?: keyof typeof textareaBorderSizes;
    variant?: keyof typeof textareaVariants;
}
export declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
