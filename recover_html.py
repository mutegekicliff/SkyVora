import json

log_file = '/Users/mutegekicliffagaba/.gemini/antigravity/brain/2da516a1-6dc8-4831-a570-dc990253cb3e/.system_generated/logs/transcript_full.jsonl'
files_state = {}

with open(log_file, 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get('type') == 'PLANNER_RESPONSE':
                # This contains tool calls
                tool_calls = data.get('tool_calls', [])
                for tc in tool_calls:
                    name = tc.get('name')
                    args = tc.get('arguments', {})
                    if name == 'default_api:write_to_file':
                        target = args.get('TargetFile', '').split('/')[-1]
                        if target.endswith('.html'):
                            files_state[target] = args.get('CodeContent', '')
                    # We can't easily replay replace_file_content without a full engine, 
                    # but maybe we can just get the last write_to_file as a base.
        except Exception as e:
            pass

for fname, content in files_state.items():
    if content:
        with open(fname, 'w') as out:
            out.write(content)
        print(f"Recovered {fname}")

