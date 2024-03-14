import { TestBed } from '@angular/core/testing';

import { ShopShellComponent } from '../components/shop-shell/shop-shell.component';
import { ShopShell } from './shop-shell.service';

describe('Shell', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopShellComponent],
    });
  });

  describe('childRoutes', () => {
    it('should create routes as children of shell', () => {
      // Prepare
      const testRoutes = [{ path: 'test' }];

      // Act
      const result = ShopShell.childRoutes(testRoutes);

      // Assert
      expect(result.path).toBe('');
      expect(result.children).toBe(testRoutes);
      expect(result.component).toBe(ShopShellComponent);
    });
  });
});
