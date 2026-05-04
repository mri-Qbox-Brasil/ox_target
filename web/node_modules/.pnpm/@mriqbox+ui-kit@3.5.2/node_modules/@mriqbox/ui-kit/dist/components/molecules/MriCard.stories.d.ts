import { StoryObj } from '@storybook/react';

declare const meta: {
    title: string;
    component: import('react').ForwardRefExoticComponent<import('react').HTMLAttributes<HTMLDivElement> & import('react').RefAttributes<HTMLDivElement>>;
    parameters: {
        layout: string;
    };
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Simple: Story;
export declare const Interactive: Story;
export declare const WithBadge: Story;
