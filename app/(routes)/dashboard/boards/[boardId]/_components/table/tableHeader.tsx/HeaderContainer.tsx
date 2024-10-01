import React from 'react';
import CollapseButton from './CollapseButton';
import Title from './Title';
import AddColumnButton from './AddColumnButton';
import MoreActionsButton from './MoreActionsButton';
import clsx from 'clsx';

interface HeaderContainerProps {
    onCollapse: () => void;
    onAddColumn: (newColumn: any) => void; 
}

const HeaderContainer: React.FC<HeaderContainerProps> = ({ onCollapse, onAddColumn }) => {
    return (
        <section>
            <div className={clsx(
                "flex items-center gap-2 mb-2"
            )}>
                <CollapseButton onClick={onCollapse} />
                <Title text="Project Management Table" />
                <AddColumnButton onAddColumn={onAddColumn} />
                <MoreActionsButton />
            </div>
        </section>
    );
};

export default HeaderContainer;