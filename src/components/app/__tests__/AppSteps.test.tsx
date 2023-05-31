
import { describe, expect, it } from "vitest";
import { AppSteps  } from '..'
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// import type { ItemProp } from "../AppTabs.vue";

const name = 'AppSteps';
describe(name, ()=> {
  const step1Text = 'Test Text';
  
  function renderUnlabeledStep() {
    return render(<AppSteps steps={[
      (<p id="step-1-slot">${step1Text}</p>),
      (<p id="step-2-slot">${step1Text}</p>),
    ]} />)
  }

  const labeledSteps = [
    'Test 1', 
    'Test 2', 
  ];
  
  // steps with custom label
  function renderLabeledStep() {
    return render(<AppSteps steps={{
      [labeledSteps[0]]: (<p id="step-1-slot">${step1Text}</p>),
      [labeledSteps[1]]: (<p id="step-2-slot">${step1Text}</p>),
    }} />)
  }
  const steps = () => screen.queryAllByRole('listitem');

  it('renders step properly', async ()=> {
    await waitFor(async ()=> {
      // Unlabeled Step
      const unlabeled = renderUnlabeledStep()
      const _steps = await steps();
      expect(_steps[1].textContent).toContain('Step 2')    
      unlabeled.unmount()
      
      // Labeled Step
      renderLabeledStep();
      const _stepsLabeled = await steps();
      expect(_stepsLabeled[1].textContent).toContain(labeledSteps[1])
    })
  })
  
  it('render steps content properly', async ()=> {
    await waitFor(async ()=>{
      // Unlabeled Step
      const unlabeled = renderUnlabeledStep()
      let content = await unlabeled.container.querySelector('#step-1-slot');
      expect(content?.textContent).toContain(step1Text)    
      unlabeled.unmount()

      // Labeled Step
      const labeled = renderLabeledStep()
      content = await labeled.container.querySelector('#step-1-slot');
      expect(content?.textContent).toContain(step1Text)    
    })
  })
  
  it('next button functions properly',  async ()=> { 
    const nextBtn = ()=> screen.queryByLabelText('next step button');
    // Unlabeled Step
    const unlabeled = renderUnlabeledStep()
    const unlabledNextBtn = await nextBtn() 
    expect(unlabledNextBtn).toBeInTheDocument();
    unlabledNextBtn && fireEvent.click(unlabledNextBtn)    
    expect(unlabledNextBtn).toHaveAttribute('disabled');
    await waitFor(async ()=>{
      const content = await unlabeled.container.querySelector('#step-2-slot');
      expect(content?.textContent).toContain(step1Text)
    }) 

    
    unlabeled.unmount()

    // Labeled Step
    const labeled = renderLabeledStep()
    const labledNextBtn = await nextBtn() 
    expect(labledNextBtn).toBeInTheDocument();
    labledNextBtn && fireEvent.click(labledNextBtn);    
    expect(labledNextBtn).toHaveAttribute('disabled');
    await waitFor(async ()=>{
      const content = await labeled.container.querySelector('#step-2-slot');
      expect(content?.textContent).toContain(step1Text)    
    }) 

    
  })

  it('previous button functions properly', async ()=> { 
    // await waitFor(async ()=>{
      const nextBtn = ()=> screen.queryByLabelText('next step button');
      const backBtn = ()=> screen.queryByLabelText('previous step button');
      // Unlabeled Step
      const unlabeled = renderUnlabeledStep();
      const unlabledBackBtn = await backBtn();
      const unlabledNextBtn = await nextBtn();
      expect(unlabledBackBtn).toBeInTheDocument();
      expect(unlabledBackBtn).toHaveAttribute('disabled');
      unlabledNextBtn && fireEvent.click(unlabledNextBtn)    
      expect(unlabledBackBtn).not.toHaveAttribute('disabled');
      // Have to wait for the second content to finish 
      // transition before changing back to old content 
      await waitFor(async ()=>{
        const newContent = await unlabeled.container.querySelector('#step-2-slot');
        expect(newContent?.textContent).toContain(step1Text)    
      });
      
      unlabledBackBtn && fireEvent.click(unlabledBackBtn)    
      await waitFor(async ()=>{
        const content = await unlabeled.container.querySelector('#step-1-slot');
        expect(content?.textContent).toContain(step1Text)    
      });
      
      unlabeled.unmount()

      // Labeled Step
      const labeled = renderLabeledStep()
      const labledBackBtn = await backBtn();
      const labledNextBtn = await nextBtn();
      expect(labledBackBtn).toBeInTheDocument();
      expect(labledBackBtn).toHaveAttribute('disabled');
      labledNextBtn && fireEvent.click(labledNextBtn)    
      expect(labledBackBtn).not.toHaveAttribute('disabled');

      // Have to wait for the second content to finish 
      // transition before changing back to old content 
      await waitFor(async ()=>{
        const newContent = await labeled.container.querySelector('#step-2-slot');
        expect(newContent?.textContent).toContain(step1Text)    
      });

      labledBackBtn && fireEvent.click(labledBackBtn)    
      await waitFor(async ()=>{
        const content = await labeled.container.querySelector('#step-1-slot');
        expect(content?.textContent).toContain(step1Text)    
      });

 
  })
})