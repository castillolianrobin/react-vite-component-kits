// import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { AppTooltip } from '../';
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
const name = 'AppTooltip';

describe(name, () => {
  const tooltipContent = 'This is the tooltip content';
  
  it('renders the correct tooltip content on mouseenter', async () => {
    waitFor(async ()=>{
      render(<AppTooltip 
        tooltipText={ tooltipContent } 
      />);
      
      const trigger = await screen.findByLabelText('tooltip-container');
      fireEvent.mouseEnter(trigger);
      
      const tooltip = ()=>screen.queryByText(tooltipContent);
      
      expect((await tooltip())).toBeInTheDocument();
      
      fireEvent.mouseLeave(trigger);
      
      expect((await tooltip())).not.toBeInTheDocument();
    })
  });

  it('renders the tooltip on click if show on click props is enabled', async ()=> {
    waitFor(async ()=>{
      render(<AppTooltip 
        showOnClick
        tooltipText={ tooltipContent } 
      />);
    
      const trigger = await screen.findByLabelText('tooltip-container');
      const tooltip = ()=>screen.queryByText(tooltipContent);
      
      // Should not activate mouse enter
      fireEvent.mouseEnter(trigger);
      expect((await tooltip())).not.toBeInTheDocument();
  
      // Should actiavate on click
      fireEvent.click(trigger);
      expect((await tooltip())).toBeInTheDocument();
  
      // Should not deactivate on mouseleave
      fireEvent.mouseLeave(trigger);
      expect((await tooltip())).toBeInTheDocument();
  
      // Should deactivaate on another click
      fireEvent.click(trigger);
      expect((await tooltip())).not.toBeInTheDocument();
    })
  })
});