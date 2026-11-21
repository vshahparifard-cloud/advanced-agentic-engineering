"""The Codex provider examples must be valid TOML with the keys Codex needs."""
import tomllib, unittest
from pathlib import Path

CONFIGS = Path(__file__).parent / 'configs'

class CodexConfigs(unittest.TestCase):
    def test_providers_use_responses_and_environment_keys(self):
        for name in ['codex-deepseek.config.toml', 'codex-openrouter-claude.config.toml']:
            config = tomllib.loads((CONFIGS / name).read_text())
            provider = config['model_providers'][config['model_provider']]
            self.assertTrue(provider['base_url'].startswith('https://'), name)
            self.assertEqual(provider.get('wire_api', 'responses'), 'responses', name)
            self.assertTrue('env_key' in provider or 'auth' in provider, name)
            self.assertNotIn('experimental_bearer_token', provider, name)

if __name__ == '__main__':
    unittest.main()
