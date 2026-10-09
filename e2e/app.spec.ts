import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('muestra el título', async ({ page }) => {
  await expect(page.getByTestId('title')).toHaveText('Demo CI');
});

test.describe('Contador', () => {
  test('arranca en 0', async ({ page }) => {
    await expect(page.getByTestId('count')).toHaveText('0');
  });

  test('suma y resta', async ({ page }) => {
    await page.getByTestId('increment').click();
    await page.getByTestId('increment').click();
    await page.getByTestId('decrement').click();
    await expect(page.getByTestId('count')).toHaveText('1');
  });

  test('reset vuelve a 0', async ({ page }) => {
    await page.getByTestId('increment').click();
    await page.getByTestId('reset').click();
    await expect(page.getByTestId('count')).toHaveText('0');
  });
});

test.describe('Tareas', () => {
  test('arranca vacía', async ({ page }) => {
    await expect(page.getByTestId('todo-empty')).toBeVisible();
  });

  test('agrega una tarea', async ({ page }) => {
    await page.getByTestId('todo-input').fill('Comprar pan');
    await page.getByTestId('todo-add').click();

    await expect(page.getByTestId('todo-list')).toContainText('Comprar pan');
    await expect(page.getByTestId('todo-input')).toHaveValue('');
  });

  test('no agrega tareas vacías', async ({ page }) => {
    await page.getByTestId('todo-input').fill('   ');
    await page.getByTestId('todo-add').click();
    await expect(page.getByTestId('todo-empty')).toBeVisible();
  });

  test('borra una tarea', async ({ page }) => {
    await page.getByTestId('todo-input').fill('Lavar platos');
    await page.getByTestId('todo-input').press('Enter');
    await page.getByRole('button', { name: 'Borrar Lavar platos' }).click();
    await expect(page.getByTestId('todo-empty')).toBeVisible();
  });
});
