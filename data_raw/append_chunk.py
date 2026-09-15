import sys

target_file = sys.argv[1]
data = sys.stdin.read()
with open(target_file, 'a', encoding='utf-8') as f:
    f.write(data)
print(f"Appended {len(data)} chars to {target_file}")
