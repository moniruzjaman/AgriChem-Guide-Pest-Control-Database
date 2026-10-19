
#!/data/data/com.termux/files/usr/bin/bash

set -e
cd "$(dirname "$0")"

echo "=== Installing Python dependencies ==="
pkg install python -y
python -m pip install pandas openpyxl

echo "=== Running database synchronization ==="
python database_sync.py

echo "=== Synchronization completed ==="

