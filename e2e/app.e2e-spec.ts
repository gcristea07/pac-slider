import { Ng2ResponsiveCarouselPage } from './app.po';

describe('ng2-responsive-carousel App', () => {
  let page: Ng2ResponsiveCarouselPage;

  beforeEach(() => {
    page = new Ng2ResponsiveCarouselPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
