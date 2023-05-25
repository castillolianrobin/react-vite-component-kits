import { describe } from "vitest";
import { AppCard } from '..';
import { renderPropTest } from "@/components/__tests__/helpers/props.test";
const name = 'AppCard';

describe(name, () => {
  renderPropTest(AppCard, 'children');
  renderPropTest(AppCard, 'title');
  renderPropTest(AppCard, 'subtitle');
  renderPropTest(AppCard, 'actions');
})